import React from 'react';
import Home from 'src/components/Home';
import Quiz from './components/Quiz';
import Categories from './components/Categories';
import SelectQuiz from './components/SelectQuiz.js';
import { Dashboard } from 'src/components/Admin/Dashboard';
import { QuizesAdm } from 'src/components/Admin/QuizesAdm';
import { QuizUpdateForm } from 'src/components/Admin/QuizAdm/forms/QuizUpdateForm';
import Test from 'src/components/Test/Test';

// C:\AAA\MyProjects\quizMasterReact\client\src\components\Test\Test.js


const Router = {
	'/': () => <Home />,
	'/quiz/:id': ({ id }) => <Quiz id={id} />,
	'/admin/categories': () => <Categories />,
	'/selectQuiz': () => <SelectQuiz />,
	'/admin': () => <Dashboard />,
	'/admin/quzes': () => <QuizesAdm />,
	'/admin/quiz/:quizId': ({ quizId }) => <QuizUpdateForm quizId={quizId} />,
	'/test': () => <Test />
};

export default Router;
