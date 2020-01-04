const express = require('express');
const router = express.Router();
const homeController = require('./controllers/home.controller');
const quizController = require('./controllers/quiz.controller');
const categoryController = require('./controllers/category.controller');

module.exports = router;

router.get('/', homeController.getHome);

router.get('/getQuizByNumber/:number', quizController.getQuizByNumber);
router.post('/addQuiz', quizController.addQiuz);
router.post('/updateQuiz', quizController.updateQuiz);
router.get('/getQuizById/:id', quizController.getQuizById);
router.get('/getQuizTitles', quizController.getQuizTitles);
router.delete('/deleteQuiz/:id', quizController.deleteQuizById)

router.get('/getAllCategories', categoryController.getAllCategories);
router.post('/addCategory', categoryController.addCategory);
