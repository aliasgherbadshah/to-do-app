var Sequelize = require("sequelize");
sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sequalise.sqlite'
});


var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	complete: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})



sequelize.sync().then(function() {
	console.log("Everything is Synced")
}).then(function(){
	return Todo.findOne({
		where:{
			id:12
		}
	})
}).then(function(todo){
	if(todo){
		console.log(todo.toJSON())
	}else{
		console.log("no such id exist please try again later")
	}
}).catch(function(error){
	console.log(error);
})










// Todo.create({
// 	description: "walking with the dead man",

// }).then(function(todo) {
// 	return Todo.create({
// 		description: "cleaning the office trash"
// 	})
// }).then(function() {
// 	return Todo.findAll({
// 		where: {
// 			complete: false

// 		}
// 	})
// }).then(function(todos) {
// 	if (todos) {

// 		console.log(todos)

// 	}

// 	console.log(todos);
// }).catch(function(error) {
// 	console.log(error)

// })