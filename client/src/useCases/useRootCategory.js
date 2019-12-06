import { useEffect, useState } from 'react';
import { api } from 'src/api/index';

export const useRootCategory = () => {

    const [rootCategory, setRootCategory] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        api.get('/categories').then((response) => {

            setRootCategory(response.data);
            setLoaded(true);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return { rootCategory, isLoaded };
};