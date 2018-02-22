var express = require("express");
var bodyParser = require("body-parser");
var _ = require('underscore');
var app = express();
var Port = process.env.PORT || 8000;
var todo =  [];
var ID = 1;

app.use(bodyParser.json());


app.get("/",function(req, res){
	res.send('Todo Api root')
});


app.get("/todos", function(req, res){
	res.json(todo)
})


app.get("/todos/:id", function(req, res){
	var todosId = parseInt(req.params.id, 10);
	var matched = _.findWhere(todo, {id: todosId});

	if(matched){
	res.json(matched)
}else{
	res.status(404).send;
}
})


//take item
app.post("/todos", function(req, res){
	var body = _.pick(req.body, 'description', 'complete');

	if(!_.isBoolean(body.complete) || !_.isString(body.description) || (body.description.trim().length === 0)){

		res.status(400).send
	}else{

		body.id = ID++;
	
			todo.push(body)
	}

	
	res.json(body)

})



//delete item
app.delete("/todos/:id",function(req, res){
	var todosId = parseInt(req.params.id, 10);
	var matched = _.findWhere(todo, {id: todosId}); 
	todo = _.without(todo, matched);
	res.send("list is deleted")
})




//update item
app.put("/todos/:id",function(req,res){

	
	var todosId = parseInt(req.params.id, 10);
	var matched = _.findWhere(todo, {id: todosId}); 
	var body = _.pick(req.body, 'description', 'complete');
	
	var varification = {};

	if(body.hasOwnProperty('complete') && _.isBoolean(body.complete)){
		varification.complete = body.complete;
		
	}else if(body.hasOwnProperty('complete')){
		res.status(400).send();
	}else{

	}

	if (body.hasOwnProperty('description') && _.isString(body.description)) {
		varification.description = body.description;
		
	}else if (body.hasOwnProperty('description')) {
		res.status(400).send()
	}

	_.extend(matched, varification);


	res.json(matched)
})


app.listen(Port,function(){
	console.log("express listning on " + Port + "!")
})







