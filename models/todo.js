module.exports = function(sequelize, DataType) {

	return  sequelize.define('todo', {
		description: {
			type: DataType.STRING,
			allowNull: false
		},
		complete: {
			type: DataType.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	})

};