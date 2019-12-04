const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true,
	},
	questions: [
		{
			text: {
				type: String,
				required: true
			},
			number: {
				type: Number,
				required: true
			}
		}
	],
	diagnozes: [
		{
			text: {
				type: String,
				required: true
			},

			key: [{
				queryNumber:{
					type: Number,
					required: true
				},
				answer:{
					type: Boolean,
					required: true
				}
				
			}]
			
		}
	]
});

const eventModel = mongoose.model('Quiz', UserSchema);

module.exports = eventModel;
