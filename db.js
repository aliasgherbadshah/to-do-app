var Sequelize = require("sequelize");
sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/data/todo-data.sqlite'
});

var db = {}


//loading different models of sqlite
db.todo = sequelize.import(__dirname + "/models/todo.js")
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;



