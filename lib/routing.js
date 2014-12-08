

Router.configure({
	layoutTemplate : 'layout',
	loadingTemplate : 'spinner',
	
	waitOn : function(){
		return Meteor.subscribe('reddit');
	}
})
Router.map(function(){
	this.route('content', {
		path : '/',
		data : function(){
			return {
				data : red.find({})
			}
		}
	})
	this.route('subreddit', {
		path : '/r/:_id',
		data : function() {
			return red.findOne({name : this.params._id});
		}
	});
})