const findAnswer = ({ answers, a1 }) => {
    const result = answers.find(x => x.questionId === a1.questionId && x.status === a1.status);
    return result;
};

const isAnswersEquals = ({ answ1, answ2 }) => {


    if (!answ2 || !answ1 || answ1.length === 0 || answ2.length === 0) {
        return false;
    }

    if (answ1.length !== answ2.length) {
        return false;
    }

    for (let i = 0; i < answ2.length; i++) {
        const a1 = answ2[i];
        const answerFind = findAnswer({ answers: answ1, a1 });
        if (!answerFind) {
            return false;
        }
    }

    return true;
};

export const findDiagnoz = ({ quiz, answers }) => {

    for (let i = 0; i < quiz.diagnozes.length; i++) {
        const diagnoz = quiz.diagnozes[i];

        if (isAnswersEquals({ answ1: diagnoz.answers, answ2: answers })) {
            return diagnoz;
        }

    }
    return null;
};