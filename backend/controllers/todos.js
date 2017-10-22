var todosModel = require('../models/todos');

var todos = {};

// controller that handles video listings fetch request.
todos.get = function (req, res) {
	
	var skip = req.query.skip;
	var limit = req.query.limit;

	var todosData = todosModel.get(skip, limit);
	todosData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.send(err);
	});
};

// controller that handles single video fetch request.
todos.insertOrUpdate = function (req, res) {
	
	var todoObject = {};
	todoObject.id = req.body.id || 123;
	todoObject.title = req.body.title;
	todoObject.description = req.body.description;
	todoObject.status = req.body.status;
	todoObject.author = req.authUser;

	var promise = todosModel.insertOrUpdate(todoObject);
	promise.then(function(todoObject){
		res.send(todoObject);
	}, function(data){
		res.send(data);
	});
};

// controller that handles video rate request
todos.delete = function (req, res) {
	
	var promise = todosModel.delete(req.body.id,req.authUser);

	promise.then(function(todoObject){
		res.send(todoObject);
	}, function(data){
		res.send(data);
	});
};

module.exports = todos;