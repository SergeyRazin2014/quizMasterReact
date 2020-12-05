import { useCallback } from 'react';
import { api } from 'src/api';
import { download } from 'src/utils/download';

const useCreateBackupArticles = () => {
    const usecase = useCallback(() => {
        api.get('/getAllArticles').then((response) => {
            const articlesJson = JSON.stringify(response.data, null, 2);
            download(articlesJson, 'articles.txt');
        });
    }, []);

    return { usecase };
};

export default useCreateBackupArticles;
