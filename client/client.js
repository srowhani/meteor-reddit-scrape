Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push(obj[key]);
    return result;
});
Handlebars.registerHelper('substr', function(myString, start, end){
	return new Handlebars.SafeString(myString.substring(start,end)+'...');
});
Handlebars.registerHelper('html', function(myString){
	return new Handlebars.SafeString(myString);
})

Template.subreddit.helpers({
	thumbnail : function(){
		if(this.thumbnail === undefined ||
		   Session.get('media'+this.title)) return undefined
		if(this.thumbnail.indexOf('http') < 0)
			return undefined
		return this.thumbnail
	},
	emb : function(){
		return Session.get('media'+this.title) || undefined;
	}
})
Template.navbar.events({
	"submit form" : function(e){
		e.preventDefault();
		var subreddit = document.querySelector('#sr').value;
		$.ajax({
			url : 'http://reddit.com/r/'.concat(sr.value).concat('.json'),
			success : function(r){
				Meteor.call('insert', subreddit, r);
				Router.go('/r/'.concat(subreddit));
			}
		})
	}
})
Template.subreddit.events({
	'click .img' : function(e){
		e.preventDefault();
		console.log(this);
		if(this.media!=null)
		Session.set('media'+this.title, decodeURIComponent(this.media.oembed.html)
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				);		
		var l = e.currentTarget.className;
		if(l=== 'rounded img') e.currentTarget.className = 'rounded img full'
		else e.currentTarget.className = 'rounded img'

	},
	'dblclick .post' : function(e){
		console.log()
		//$.get(this.url, function(result){e.currentTarget.children['load'].innerHTML = result})
	},
	'click #erase' : function(e){
		Meteor.call('remove', this.name);
		Router.go('/')

	}
})
