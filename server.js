var express = require("express");
var bodyParser = require("body-parser");
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var Port = process.env.PORT || 8000;
var todo = [];
var ID = 1;

app.use(bodyParser.json());


app.get("/", function(req, res) {
	res.send('Todo Api root')
});


app.get("/todos", function(req, res) {
	var query = req.query;
	var where = {};

	if (query.complete === 'true') {
		db.todo.findAll({
			where: {
				complete: true
			}
		}).then(function(todo) {
			if (todo) {
				res.json(todo)
			} else {
				res.send("no true completion")
			}
		})
	} else if (query.complete === 'false') {
		db.todo.findAll({
			where: {
				complete: false
			}
		}).then(function(todo) {
			if (todo) {
				res.json(todo)
			} else {
				res.send("no true completion")
			}
		})
	} else if (query.hasOwnProperty('q')) {
		db.todo.findAll({
			where: {
				$like: '%' + query.q + '%'
			}
		}).then(function(todos) {
			if (todos) {
				res.json(todos)
			} else {
				res.send('no description contain this kind of string')
			}
		})
	} else {
		db.todo.findAll({
			where: where
		}).then(function(todo) {
			if (todo) {
				res.json(todo)
			} else {
				res.send("there is no kind of desciption added yet")
			}
		})
	}

})


app.get("/todos/:id", function(req, res) {
	var todosId = parseInt(req.params.id, 10);

	db.todo.findOne({
		where: {
			id: todosId
		}
	}).then(function(todo) {
		if (todo) {
			res.json(todo.toJSON())
		} else {
			res.send("no such description contain this id")
		}
	}).catch(function(error) {
		res.status(400).send();
	})


	// var matched = _.findWhere(todo, {
	// 	id: todosId
	// });

	// if (matched) {
	// 	res.json(matched)
	// } else {
	// 	res.status(404).send;
	// }
})



//take item
app.post("/todos", function(req, res) {
	var body = _.pick(req.body, 'description', 'complete');

	db.todo.create(body).then(function(todo) {
		res.json(todo.toJSON());
	}, function(e) {
		res.status(400).send();
	})

})



//delete item
app.delete("/todos/:id", function(req, res) {
	var todosId = parseInt(req.params.id, 10);
	var matched = _.findWhere(todo, {
		id: todosId
	});
	todo = _.without(todo, matched);
	res.send("list is deleted")
})



//update item
app.put("/todos/:id", function(req, res) {


	var todosId = parseInt(req.params.id, 10);
	var matched = _.findWhere(todo, {
		id: todosId
	});
	var body = _.pick(req.body, 'description', 'complete');

	var varification = {};

	if (body.hasOwnProperty('complete') && _.isBoolean(body.complete)) {
		varification.complete = body.complete;

	} else if (body.hasOwnProperty('complete')) {
		res.status(400).send();
	} else {

	}

	if (body.hasOwnProperty('description') && _.isString(body.description)) {
		varification.description = body.description;

	} else if (body.hasOwnProperty('description')) {
		res.status(400).send()
	}

	_.extend(matched, varification);


	res.json(matched)
})



db.sequelize.sync().then(function() {
	app.listen(Port, function() {
		console.log("express listning on " + Port + "!")
	})
}).catch(function(error) {
	console.log(error);
})