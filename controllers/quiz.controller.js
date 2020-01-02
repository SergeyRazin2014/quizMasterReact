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
			res.send('error: ', err.message);
		}
	},
	async updateQuiz(req, res) {
		try {

			let newQuiz = req.body;

			let modelForValid = new Quiz(newQuiz);
			let err = modelForValid.validateSync();
			if (err) {
				console.log(err);
			}

			let result = await Quiz.findOneAndUpdate({ _id: newQuiz._id }, newQuiz);

			if(result){
				res.json(result);
			}else{
				res.sendStatus(500).send(err);
			}


		} catch (err) {
			console.log(err);
			res.send('error: ', err.message);
		}
	},
	async getQuizById(req, res) {
		try {
			let quizId = req.params['id'];
			const find = await Quiz.findOne({ _id: quizId });
			res.json(find);
		} catch (err) {
			console.log(err);
			res.send('error:', err.message);
		}
	},
	async deleteQuizById(req, res) {
		try {
			let quizId = req.params['id'];
			const find = await Quiz.findOneAndDelete({ _id: quizId });
			res.json(find);
		} catch (err) {
			console.log(err);
			res.send('error:', err.message);
		}
	},
	async getQuizTitles(req, res) {
		//выбираем тесты согласно списка номеров и берем только номер и имя теста
		let quizes = await Quiz.find({}, { number: 1, title: 1, isCorrect: 1 });
		res.json(quizes);
	},
};
