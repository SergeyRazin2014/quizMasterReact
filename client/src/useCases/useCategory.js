import { useEffect, useState } from 'react';
import { api } from "src/api";

export const useCategory = ({ id }) => {

    debugger;

    const [category, setCategory] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        if (!id) {
            setCategory({
                title: 'Новая категория',
                children: []
            });
            setIsLoaded(true);
            return;
        }


        api.get(`/category/${id}`)
            .then((response) => {
                setCategory(response.data);
                setIsLoaded(true);
            });
    }, []);

    return { category, setCategory, isLoaded };
};