import { useCallback } from 'react';
import { api } from 'src/api';
import { download } from 'src/utils/download';

const useCreateBackupQuizes = () => {
    const usecase = useCallback(() => {
        api.get('/getAllQuizes').then((response) => {
            const quizesJson = JSON.stringify(response.data, null, 2);
            download(quizesJson, 'quizes.txt');
        });
    }, []);

    return { usecase };
};

export default useCreateBackupQuizes;
