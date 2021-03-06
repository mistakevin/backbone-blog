var Backbone = require('backbone');
var $ = require('jquery');
var PostsListView = require('./views/PostsListView.js');
var PostView = require('./views/PostView.js');
var PostsCollection = require('./collections/PostsCollection.js');
var PostModel = require('./models/PostModel.js');

var AppRouter = Backbone.Router.extend({

    routes: {
        'posts': 'showPosts',
        'posts/:id': 'showSinglePost'
    },

    showPosts: function() {
        var posts = new PostsCollection();

        posts.fetch({
            success: function() {
                var postsListView = new PostsListView({ collection: posts });
                postsListView.render();
                $('#content').html(postsListView.el);
            }
        });
    },

    showSinglePost: function(id) {
        var postModel = new PostModel({ id: id + '.json' });
        postModel.fetch({
            success: function() {
                var postView = new PostView({ model: postModel });
                postView.render();
                $('#content').html(postView.el);
            }
        });
    }

});

module.exports = AppRouter;