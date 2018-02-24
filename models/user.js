var bcrypt = require('bcrypt');
var _ = require('underscore');





module.exports = function(sequelize, DataType) {

	return sequelize.define('user', {
		email: {
			type: DataType.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		salt: {
			type: DataType.STRING
		},
		password_hash:{
			type:DataType.STRING
		},
		password: {
			type: DataType.VIRTUAL,
			allowNull: false,
			set: function(value){
				var salt = bcrypt.genSaltSync(10);//genrate key
				var hashedPassword = bcrypt.hashSync(value, salt)//hashing algorithum

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword)
			}
		}
	}, {
		hooks: {
			beforeValidate: function(user, option){
					if(typeof user.email === 'string'){
						user.email = user.email.toLowerCase();
					}
			}
		},
		instanceMethods:function(){
			toPublicJSON: function(){
				var json = this.toJSON();
			}
		}
	})

};