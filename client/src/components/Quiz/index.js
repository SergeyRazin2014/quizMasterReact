import React from 'react';
//--
import { useLoadQuiz } from './useCases/useLoadQuiz';

const Quiz = () => {
	const { quiz, isLoaded } = useLoadQuiz({ quizNumber: 1 });

	if(!isLoaded){
		return <p>Loading...</p>
	}

	return <div>{quiz.text}</div>;
};

export default Quiz;
