const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
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

			answers: [{
				questionId:{
					type: String,
					required: true
				},
				status:{
					type: Boolean,
					required: true
				}
				
			}]
			
		}
	]
});

const eventModel = mongoose.model('Quiz', UserSchema);

module.exports = eventModel;
