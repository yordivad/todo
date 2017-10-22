var users = require('../controllers/users');
var todos = require('../controllers/todos');
var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app){
	//user routes
	app.post('/user/auth', users.auth);
	app.get('/user/logout', helpers.isAuthenticated, users.logout);
	
	//video routes
	app.get('/todos', helpers.isAuthenticated, todos.get);
	app.put('/todo', helpers.isAuthenticated, todos.insertOrUpdate);
	app.delete('/todo', helpers.isAuthenticated, todos.delete);
};

module.exports = routesAPI;