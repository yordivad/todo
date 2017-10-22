var mongoose = require('mongoose');
var q = require('q');
var users = require('./users');

//defining schema for videos table
var todoSchema = new mongoose.Schema({
	  title: { type: String,  required: true}, 
	  description: { type: String }, 
	  status: {type: String, enum:["completed", "notCompleted"]},
	  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
});

var Todos = mongoose.model('Todos', todoSchema);

//Initlizing interface object of this model.
var todosModel = {};

//Function to seed videos data.
todosModel.seed = function(){

	var usersData = users.get();
	usersData.then(function(data){
		var userId = data[0]._id;
		var todos=Array();
		todos.push({title: "Deploy Webapp", description: "<p>latest commit on webapp needs deployment</p>", status:"completed", author: userId});
		todos.push({title: "Add new feature", description: "<p>Add the drag drop feature in webapp</p>", status:"notCompleted", author: userId});
		todos.push({title: "Upgrade NodeJs", description: "<p>Upgrade nodeJs version to latest one.</p>", status:"notCompleted", author: userId});
		todos.push({title: "Upgrade servers", description: "<p>Upgrade compute capasity of AWS servers</p>", status:"completed", author: userId});
		todos.push({title: "Train new recruits", description: "<p>Give training to new recruits</p>", status:"notCompleted", author: userId});

		Todos.collection.insert(todos, function(err, todos) {
			if(err){
				console.log('error occured in populating database');	
				console.log(err);	
			} 
			else{
				console.log('Todos collection populated.');	
			}	
		});
	});
};

//function to get todos
todosModel.get = function(skip, limit){
	var results = q.defer();

	skip = parseInt(skip) || 0;
	limit = parseInt(limit) || 10;

	Todos.find({}).populate("author", "username").skip(skip).limit(limit).exec(function(err, dbTodos) {
		if (err){
			results.reject(err);
		} 
		results.resolve(dbTodos);
    });
    return results.promise;
};

//function to delete todos
todosModel.delete = function(todoId, author){
	var results = q.defer();
	var res = {};
	res.status = "success";

	Todos.findOne({_id: todoId}, function(err, dbTodos) {
		if (err){
			res.status = "error";
			res.data = err;
			results.reject(res);
			return;
		}
		if(dbTodos==undefined) {
			res.status = "error";
			res.data = "No todo found with this id";
			results.reject(res);
			return;	
		}

		if(String(dbTodos.author)!==String(author._id)) {
			res.status = "error";
			res.data = "You are not the owner of this todo";
			results.reject(res);
			return;	
		}

		dbTodos.remove(function (err,removed) {
			if(err){
				res.status = "error";
				res.data = err;
				results.reject(res);
				return;
			}

			res.data = removed;
			results.resolve(res);
		});
		
	});

	return results.promise;	
};

//insertOrUpdate todos
todosModel.insertOrUpdate = function(data){
	var results = q.defer();
	Todos.findOne({_id: data.id}, function(err, dbTodos) {
		var res = {};
		res.status = "success";
		if (err && err.name!="CastError"){
			res.status = "error";
			res.data = err;
			results.reject(res);
			return;
		}
		
		if(dbTodos == undefined){
			var dbTodos = new Todos();
			dbTodos.author = data.author._id;
		} else {
			if(String(dbTodos.author)!=String(data.author._id)) {
				if(data.title || data.description) {
					res.status = "error";
					res.data = "You cannot update title or description of this todo";
					results.reject(res);
					return;
				}
			}
		}
		if(data.title) dbTodos.title = data.title;
		if(data.description) dbTodos.description = data.description;
		if(data.status) dbTodos.status = data.status;
		dbTodos.save(function(err, dbTodo){
			if (err){
				res.status = "error";
				res.data = err;
				results.reject(res);
				return;
			} 
			res.data = dbTodo;
			results.resolve(res);

		});
	});
	return results.promise;
	
};

module.exports = todosModel;