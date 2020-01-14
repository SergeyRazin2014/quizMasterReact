import React from 'react';
import Home from 'src/components/Home';
import Quiz from './components/Quiz';
import Categories from './components/Categories';
import SelectQuiz from './components/SelectQuiz.js';
import { Dashboard } from 'src/components/Admin/Dashboard';
import { QuizesAdm } from 'src/components/Admin/QuizesAdm';
import { QuizUpdateForm } from 'src/components/Admin/QuizAdm/forms/QuizUpdateForm';
import { ArticlesAdm } from 'src/components/Admin/ArticlesAdm';
import { ArticleAdm } from './components/Admin/ArticleAdm/ArticleAdm';
import { ArticleShow } from './components/Article/ArticleShow';
import { LoginForm } from './components/Auth/Login';
import { RegisterForm } from './components/Auth/Register';
import { userRoles } from './common/userRoles';

const Router = {
	'/': () => <Home />,
	'/quiz/:id': ({ id }) => <Quiz id={id} />,
	'/admin/categories': () => <Categories />,
	'/selectQuiz': () => <SelectQuiz />,
	'/admin': () => <Dashboard />,
	'/admin/quizes': () => <QuizesAdm />,
	'/admin/quiz/:quizId': ({ quizId }) => <QuizUpdateForm quizId={quizId} />,
	'/admin/addQuiz': () => <QuizUpdateForm quizId={null} />,
	'/admin/articles': () => <ArticlesAdm />,
	'/admin/article/:id': ({ id }) => <ArticleAdm articleId={id} />,
	'/articleShow/:id': ({ id }) => <ArticleShow articleId={id} />,
	'/admin/addArticle': () => <ArticleAdm articleId={null} />,
	'/login': () => <LoginForm />,
	'/register': () => <RegisterForm />
};

const userRouter = {
	'/': () => <Home />,
	'/quiz/:id': ({ id }) => <Quiz id={id} />,
	'/selectQuiz': () => <SelectQuiz />,
	'/articleShow/:id': ({ id }) => <ArticleShow articleId={id} />,
	'/login': () => <LoginForm />,
	'/register': () => <RegisterForm />
};

const getRouter = (userRole) => {
	if (userRole === userRoles.admin) {
		return Router;
	}
	return userRouter;

};

export default getRouter;
