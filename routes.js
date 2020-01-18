const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const quizController = require('./controllers/quiz.controller');
const categoryController = require('./controllers/category.controller');
const articleController = require('./controllers/article.controller');
const authController = require('./controllers/auth.controller');
const auth = require('./middleware/auth');


module.exports = router;

// правила валидации----------------------↓
const addUserRules = [
    check('login', 'Login is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
];

// роуты----------------------------------↓

// тесты
router.get('/getQuizByNumber/:number', auth, quizController.getQuizByNumber);
router.post('/addQuiz', auth, quizController.addQiuz);
router.post('/updateQuiz', auth, quizController.updateQuiz);
router.get('/getQuizById/:id', auth, quizController.getQuizById);
router.get('/getQuizTitles', auth, quizController.getQuizTitles);
router.delete('/deleteQuiz/:id', auth, quizController.deleteQuizById)

// категории
router.get('/getAllCategories', auth, categoryController.getAllCategories);
router.post('/addCategory', auth, categoryController.addCategory);
router.post('/updateCategory', auth, categoryController.updateCategory);
router.get('/category/:id', auth, categoryController.getCategoryById)

// статьи
router.post('/addArticle', auth, articleController.addArticle);
router.post('/updateArticle', auth, articleController.updateArticle);
router.delete('/deleteArticle/:id', auth, articleController.deleteArticle)
router.get('/getAllArticles', auth, articleController.getAllArticles);
router.get('/getArticleById/:id', auth, articleController.getArticleById);

// users
router.post('/register', addUserRules, authController.addUser);
router.post('/login', addUserRules, authController.login);
router.get('/authUser', auth, authController.getAuthUser)
