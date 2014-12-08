Meteor.publish('reddit', function(){
	return red.find()
});

Meteor.methods({
	insert : function(subreddit, r){
		var v = red.findOne({name : subreddit});
		var map = {};
		r.data.children.forEach(function(i){
			map[i.data.title.replace(/\./g, '')] = i.data;
		});
		if(v)
			red.update(v,
				{$set : {posts : map}}
			)
		else
			red.insert({
				name : subreddit,
				posts : map,
				date: new Date()
			});
	},
	remove : function(subreddit){
		red.remove({name : subreddit});
	}
})