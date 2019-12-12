import { useEffect, useState } from 'react';
import { api } from 'src/api/index';

export const useQuizTitles = () => {
    const [isLoaded, setLoaded] = useState(false);
    const [quizTitles, setQuizTitles] = useState(null);

    useEffect(() => {
        api.get('/getQuizTitles').then((response) => {
            setQuizTitles(response.data);
            setLoaded(true);
        });
    }, []);

    return { quizTitles, isLoaded };
};