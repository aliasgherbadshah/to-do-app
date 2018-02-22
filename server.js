var express = require("express");
var bodyParser = require("body-parser");
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
	var matched;

	todo.forEach(function(todos){
		
		if(todosId === todos.id){
			matched = todos
		}
	})
	if(matched){
	res.json(matched)
}else{
	res.status(404).send;
}
})



app.post("/todos", function(req, res){
	var body = req.body;
	body.id = ID++;
	
	todo.push(body)
	res.json(body)

})







app.listen(Port,function(){
	console.log("express listning on " + Port + "!")
})







