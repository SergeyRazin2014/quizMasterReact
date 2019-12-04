import React from 'react';
import Home from 'src/components/Home';
import Quiz from './components/Quiz';
import Categories from './components/Categories';
import SelectQuiz from './components/SelectQuiz.js';


const Router = {
	'/': () => <Home />,
	'/quiz': () => <Quiz />,
	'/categories': () => <Categories />,
	'/selectQuiz': () => <SelectQuiz />
};

export default Router;
