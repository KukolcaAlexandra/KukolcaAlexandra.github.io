var crypto = require('crypto');

var mongoose = require('../lib/mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	type: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	start: {
		type: Date,
		default: Date.now
	},
	speakers: {
		type: Array
	},
	resources: {
		type: Array
	},
	location: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

/*schema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	}) 
	.get(function() { return this._plainPassword; });

schema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};*/

exports.Event = mongoose.model('Event', schema);