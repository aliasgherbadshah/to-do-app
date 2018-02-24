var bcrypt = require('bcrypt');
var _ = require('underscore');
var crypto = require("crypto-js");
var jwt = require('jwt-simple');
var stringify = require('json-stringify-safe');


module.exports = function(sequelize, DataType) {

	var user = sequelize.define('user', {
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
		password_hash: {
			type: DataType.STRING
		},
		password: {
			type: DataType.VIRTUAL,
			allowNull: false,
			set: function(value) {
				var salt = bcrypt.genSaltSync(10); //genrate key
				var hashedPassword = bcrypt.hashSync(value, salt) //hashing algorithum

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword)
			}
		}
	}, {
		hooks: {
			beforeValidate: function(user, option) {
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		}
	})



	user.prototype.grantToken = function(type) {

		if (!_.isString(type)) {
			return undefined;
		}

		try {

			var idString = {
				id: this.get('id'),
				type: type
			};

			var stringdata = JSON.stringify(idString);
			console.log("****************************************************")

			var encyption = crypto.AES.encrypt(stringdata, 'abc123');				



			var payload = { foo: 'encyption' };
			var token = jwt.encode(payload, 'asd123');

		// var token = jwt.sign({
		// 		token: string
		// 	}, 'qwerty098')

			

		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", encyption);

			return token;
		} catch (e) {
			console.log(e)
			return undefined

		}

	}

	return user;

};