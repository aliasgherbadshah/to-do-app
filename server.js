var express = require("express");
var app = express();
var Port = process.env.PORT || 8000;


app.get("/",function(req, res){
	res.send('Todo Api root')
});


app.listen(Port,function(){
	console.log("express listning on " + Port + "!")
})







