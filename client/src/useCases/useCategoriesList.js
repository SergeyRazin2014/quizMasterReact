import { useEffect, useState } from 'react';
import { api } from 'src/api/index';

export const useCategoriesList = () => {

    const [allCategories, setAllCategories] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {

        api.get('/getAllCategories').then((response) => {

            // проставляю номера для категорий
            response.data.forEach((item, index) => {
                item.number = index + 1;
            });

            setAllCategories(response.data);
            setLoaded(true);
        }).catch((err) => {
            setLoaded(true);
            console.log(err);
        });
    }, []);

    return { allCategories, isLoaded };
};