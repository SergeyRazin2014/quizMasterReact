const Quiz = require('../models/quiz');

module.exports = {
	async getQuizByNumber(req, res) {
		try {
			let quizNumber = req.params['number'];
			const find = await Quiz.findOne({ number: quizNumber });
			res.json(find);
		} catch (err) {
			console.log(err);
			res.json(err);
		}
	},
	async addQiuz(req, res) {
		try {
            const quiz = new Quiz(req.body);
			await quiz.save();
			res.send('quiz add success');
		} catch (err) {
			console.log(err);
			res.send('error:', err.message);
		}
	}
};
