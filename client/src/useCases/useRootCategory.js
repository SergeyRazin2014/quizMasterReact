import { useEffect, useState } from 'react';
import { api } from 'src/api/index';
import { buildNode } from 'src/components/Categories/common/Nod';

export const useRootCategory = () => {

    const [rootNode, setRootNode] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    const rootCategory = buildNode(rootNode);

    useEffect(() => {
        api.get('/categories').then((response) => {

            setRootNode(response.data);
            setLoaded(true);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return { rootCategory, isLoaded };
};