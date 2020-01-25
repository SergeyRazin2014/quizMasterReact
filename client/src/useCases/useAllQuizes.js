import { api } from "src/api"
import { useEffect, useState } from 'react';


export const useAllQuizes = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [allQuizes, setAllQuizes] = useState(null);

    useEffect(() => {
        api.get('/getAllQuizes').then(response => {
            setAllQuizes(response.data);
            setIsLoaded(true);
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setIsLoaded(true);
        });
    }, []);

    return { allQuizes, isLoaded };


}