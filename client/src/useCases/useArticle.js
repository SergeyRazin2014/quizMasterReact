import { useEffect, useState } from 'react';
import { api } from 'src/api';


export const useArticle = ({ articleId }) => {
    const [article, setArticle] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!articleId) {
            const newArticle = { title: 'Новая статья', text: '' };
            setArticle(newArticle);
            setIsLoaded(true);
            return;
        }

        api.get(`/getArticleById/${articleId}`).then(response => {
            setArticle(response.data);
            setIsLoaded(true);
        }).catch(err => {
            console.log(err);
            setIsLoaded(true);
        });
    }, []);

    return { article, setArticle, isLoaded };

};