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



var User = sequelize.define('user',{
	email:{
		type: Sequelize.STRING
	}
})

Todo.belongsTo(User);
User.hasMany(Todo);


sequelize.sync({force: true}).then(function() {
	console.log("Everything is Synced")
})

