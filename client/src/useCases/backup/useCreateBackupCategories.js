import { useCallback } from 'react';
import { api } from 'src/api';
import { download } from 'src/utils/download';

const useCreateBackupCategories = () => {
    const usecase = useCallback(() => {
        api.get('/getAllCategories').then((response) => {
            const categoriesJson = JSON.stringify(response.data, null, 2);
            download(categoriesJson, 'categories.txt');
        });
    }, []);

    return { usecase };
};

export default useCreateBackupCategories;
