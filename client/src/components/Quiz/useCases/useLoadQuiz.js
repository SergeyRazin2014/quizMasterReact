import { useEffect, useState } from 'react';
import axios from 'axios';

export const useLoadQuiz = ({ quizNumber }) => {
	const [ quiz, setQuiz ] = useState(null);
	const [ isLoaded, setisLoaded ] = useState(false);

	useEffect(
		() => {
			axios.get(`/getQuiz/${quizNumber}`).then((response) => {
				console.log(response);
				setQuiz(response.data);
				setisLoaded(true);
			});
		},
		[ quizNumber ]
	);

	return { quiz, isLoaded };
};
