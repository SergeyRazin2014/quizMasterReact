const express = require('express');
const router = express.Router();
const homeController = require('./controllers/home.controller');
const quizController = require('./controllers/quiz.controller');
const categoryController = require('./controllers/category.controller');

module.exports = router;

router.get('/', homeController.getHome);

router.get('/getQuizByNumber/:number', quizController.getQuizByNumber);
router.post('/addQuiz', quizController.addQiuz);
router.get('/getQuizById/:id', quizController.getQuizById);
router.get('/getQuizTitles', quizController.getQuizTitles);

router.get('/categories', categoryController.getRootCategory);
