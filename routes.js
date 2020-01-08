const express = require('express');
const router = express.Router();
const homeController = require('./controllers/home.controller');
const quizController = require('./controllers/quiz.controller');
const categoryController = require('./controllers/category.controller');
const articleController = require('./controllers/article.controller');

module.exports = router;

router.get('/', homeController.getHome);

// тесты
router.get('/getQuizByNumber/:number', quizController.getQuizByNumber);
router.post('/addQuiz', quizController.addQiuz);
router.post('/updateQuiz', quizController.updateQuiz);
router.get('/getQuizById/:id', quizController.getQuizById);
router.get('/getQuizTitles', quizController.getQuizTitles);
router.delete('/deleteQuiz/:id', quizController.deleteQuizById)

// категории
router.get('/getAllCategories', categoryController.getAllCategories);
router.post('/addCategory', categoryController.addCategory);

// статьи
router.post('/addArticle', articleController.addArticle);
router.post('/updateArticle', articleController.updateArticle);
router.delete('/deleteArticle/:id',articleController.deleteArticle)
router.get('/getAllArticles', articleController.getAllArticles);
router.get('/getArticleById/:id', articleController.getArticleById);
