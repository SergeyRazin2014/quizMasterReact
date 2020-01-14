const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
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
			title: {
				type: String,
				required: true,
			},
			text: {
				type: String,
				required: true,
				
			},

			answers: [{
				questionId: {
					type: String,
					required: true
				},
				status: {
					type: Boolean,
					required: true
				}

			}]

		}
	]
});

const eventModel = mongoose.model('Quiz', QuizSchema);

module.exports = eventModel;
