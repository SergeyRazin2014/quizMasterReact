import { useCallback } from 'react';

const isDiagCorrect = (diagnoz) => {
    if (!diagnoz) {
        return true;
    }

    let result = true;
    diagnoz.answerKey.replace(/[^\d]/g, '').split('').forEach((x, index) => {
        if (+x !== index + 1) {
            result = false;
        }
    });

    return result;
};

export const useDiagnozesKeyNumbersAndCorrect = () => {
    const useCase = useCallback((quiz) => {

        quiz.diagnozes.forEach((diag, index) => {
            diag.key = diag._id;
            diag.number = index + 1;

            diag.answerKey = '';
            diag.answers.forEach(a => {
                const findedQuestion = quiz.questions.find(question => question._id === a.questionId);
                if (!findedQuestion) {
                    return;
                }
                const resultStr = `${findedQuestion.number}: ${a.status ? 'Да' : 'Нет'}`;
                diag.answerKey += ' ' + resultStr;

                diag.isCorrect = isDiagCorrect(diag);

                if (!diag.isCorrect) {
                    quiz.isCorrectStr = 'Нет';
                }
            });
        });
    }, []);

    return { useCase };
};
