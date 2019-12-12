import React from 'react';
import { useQuiz } from 'src/useCases/useQuiz';

const Quiz = (props) => {

	const { id: _id } = props;
	const { quiz, isLoaded } = useQuiz({ _id });

	debugger;

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	return <div>{quiz.title}</div>;
};

export default Quiz;
