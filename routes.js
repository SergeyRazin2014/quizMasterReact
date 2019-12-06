const express = require('express');
const router = express.Router();
const homeController = require('./controllers/home.controller');
const quizController = require('./controllers/quiz.controller');
const categoryController = require('./controllers/category.controller');

module.exports = router;

router.get('/', homeController.getHome);

router.get('/getQuiz/:number', quizController.getQuizByNumber);
router.post('/addQuiz', quizController.addQiuz);

router.get('/categories', categoryController.getRootCategory);
