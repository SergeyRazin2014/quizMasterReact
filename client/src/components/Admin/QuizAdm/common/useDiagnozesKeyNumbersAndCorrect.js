import { useCallback } from 'react';

const isDiagCorrect = (diagnoz) => {
    if (!diagnoz) {
        return true;
    }

    let result = true;

    diagnoz.answers.forEach((a, index) => {
        if (a.number !== index + 1) {
            result = false;
        }
    });

    return result;
};

const sortDiagAnswers = (answers) => {
    answers.sort((a1, a2) => {
        if (a1.number < a2.number) return -1;
        if (a1.number > a2.number) return 1;
        return 0;
    });
};

// функция добавляет номера такие же как у вопросов в ответ диагноза
const addNumberToAnswers = (diag, quiz) => {

    const result = diag.answers.map(a => {
        const findedQuestion = quiz.questions.find(question => question._id === a.questionId);
        if (!findedQuestion) {
            return;
        }

        return { ...a, number: findedQuestion.number };

    });

    return result;

};

export const useDiagnozesKeyNumbersAndCorrect = () => {
    const useCase = useCallback((quiz) => {
        quiz.isCorrectStr = 'Да';
        quiz.diagnozes.forEach((diag, index) => {
            diag.key = diag._id;
            diag.number = index + 1;

            diag.answers = addNumberToAnswers(diag, quiz);
            sortDiagAnswers(diag.answers);

            diag.answerKey = '';
            diag.answers.forEach(a => {
                const findedQuestion = quiz.questions.find(question => question._id === a.questionId);

                if (!findedQuestion) {
                    return;
                }

                const resultStr = `${findedQuestion.number}: ${a.status ? 'Да' : 'Нет'}`;
                diag.answerKey += ' ' + resultStr;
            });

            diag.isCorrect = isDiagCorrect(diag);

            if (!diag.isCorrect) {
                quiz.isCorrectStr = 'Нет';
            }
        });
    }, []);

    return { useCase };
};
