import { useEffect, useState } from 'react';
import { api } from 'src/api';

export const useQuiz = ({ _id }) => {
    const [quiz, setQuiz] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        if (!_id) {
            setQuiz({
                title: `Новый тест`,
                isCorrect: true,
                questions: [],
                diagnozes: []
            });
            setIsLoaded(true);
            return;
        }

        api.get(`/getQuizById/${_id}`).then((response) => {
            setQuiz(response.data);
            setIsLoaded(true);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return { quiz, setQuiz, isLoaded };
};