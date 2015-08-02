var keystone = require('keystone'),
    Post = keystone.list('Post');

module.exports.getAll = function(req, res) {
	Post.model.find(function(err,posts){
		if(err) {return next(err);}

		res.json(posts);
	})

}

module.exports.get = function(req, res) {
	res.json(req.post);

}

module.exports.create = function(req, res) {
	var post = new Post.model(req.body);
	//user.name = req.body.name;
		res.json(result);
	// });
}

module.exports.edit = function(req, res) {
	var post = req.post;

	post.title = req.body.title;
	post.moedl.save(function(err,result){
		res.json(result);
	});
}


module.exports.fork = function(req, res) {

	//code to fork here
	
	// var post = req.post;

	// post.title = req.body.title;
	// post.moedl.save(function(err,result){
	// 	res.json(result);
	// });
}


