import { useState, useEffect } from 'react';
import { api } from 'src/api';

export const useArticles = () => {
    const [articles, setArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        api.get('/getAllArticles')
            .then(response => {

                response.data.forEach((art, index) => {
                    art.number = index + 1;
                });

                setArticles(response.data);
                setIsLoading(true);
            }).catch(err => {
                console.log(err);
                setIsLoading(true);
            });
    }, []);


    return { articles, isLoading };

};