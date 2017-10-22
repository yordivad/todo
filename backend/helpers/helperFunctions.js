var Users = require('../models/users');
var Todos = require('../models/todos');

var helpers = {};

//Function that checks if the request is authenticated or not.
helpers.isAuthenticated = function(req, res, next){

	if(!req.query.sessionId){
		res.status(401);
		res.send({status:'error',error:'Not Authorized.'});
	}
	else{
		var user = Users.getBySessionId(req.query.sessionId);	
		user.then(function(dbuser){
			if(dbuser){
				req.authUser = dbuser;
				next();
			}else{
				res.status(401);
				res.send({status:'error',error:'Not Authorized.'});		
			}	
		});
		
	}
};

function populateTodos() {
	var promise2 = Todos.get();
	promise2.then(function(data){
		if(data.length){
			console.log('Todos collection already populated.');
		}
		else{
			console.log('Populating Todos collection.');
			Todos.seed();	
		}
	});
}

//Function to populate data in DB if DB is empty.
helpers.populateDb = function(){
	var promise = Users.get();

	promise.then(function(data){
		if(data.length){
			console.log('Users collection already populated.');
			populateTodos();
		}
		else{
			console.log('Populating users collection.');
			var usersPopulated = Users.seed();
			usersPopulated.then(function (data) {
				console.log("Populated");
				populateTodos();
			});	
		}
	});
};

module.exports = helpers;
