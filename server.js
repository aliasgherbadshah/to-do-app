var express = require("express");
var app = express();
var Port = process.env.PORT || 8000;
var todo =  [{
	id : 1,
	description: "i want to send an important mail to my boss",
	complete : false
},
{
	id : 2,
	description: "i am going movie today at 8:00 clock",
	complete : false
},
{
	id : 3,
	description: "tomorrow i have some work at big bazar",
	complete : true
}

]


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


app.listen(Port,function(){
	console.log("express listning on " + Port + "!")
})







