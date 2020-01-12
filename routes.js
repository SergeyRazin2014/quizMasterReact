const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const homeController = require('./controllers/home.controller');
const quizController = require('./controllers/quiz.controller');
const categoryController = require('./controllers/category.controller');
const articleController = require('./controllers/article.controller');
const authController = require('./controllers/auth.controller');


module.exports = router;

// правила валидации----------------------↓
const addUserRules = [
    check('login', 'Login is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
];

// роуты----------------------------------↓

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
router.delete('/deleteArticle/:id', articleController.deleteArticle)
router.get('/getAllArticles', articleController.getAllArticles);
router.get('/getArticleById/:id', articleController.getArticleById);

// users
router.post('/register', addUserRules, authController.addUser);
router.post('/login', addUserRules, authController.login);
