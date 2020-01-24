const fs = require('fs');
const categoriesBase = require('../problemgroupsBase.json');
const quizesBase = require('../quizesBase.json');




async function execute() {
    const quizArrResult = [];

    for (let i = 0; i < quizesBase.length; i++) {
        const quizBase = quizesBase[i];
        const quizResult = {};
        quizResult.title = quizBase.name;
        quizResult.questions = mapQuestions(quizBase.questions);
        quizResult.diagnozes = mapDiagnozes(quizBase.diagnoses, quizResult.questions);
        quizResult.categoryId = mapCategoryId(quizBase);

        quizArrResult.push(quizResult);
    }

    fs.writeFileSync('./quizResult.json', JSON.stringify(quizArrResult));

}

function mapCategoryId(baseQuiz) {

    const findCategoryBase = categoriesBase.find(c => c.quizNumbers.some(qn => qn === baseQuiz.number));

    return findCategoryBase._id.$oid;
}

function mapQuestions(questionsBase) {
    const questionsResult = [];
    for (let i = 0; i < questionsBase.length; i++) {
        const questionBase = questionsBase[i];
        const questionResult = mapQuestion(questionBase, i + 1);
        questionsResult.push(questionResult);
    }

    return questionsResult;
};

function mapQuestion(questionBase, number) {
    const result = {};
    result.text = questionBase.name;
    result._id = questionBase._id.$oid;
    result.number = number
    return result;
}

function mapDiagnozes(diagnosesBase, questionsResult) {
    const diagnozesResult = [];
    for (let i = 0; i < diagnosesBase.length; i++) {
        const diagnozBase = diagnosesBase[i];
        const result = {};
        result.title = `Диагноз${i + 1}`;
        result.text = diagnozBase.name;
        result.answers = mapAnswers(diagnozBase.keys, questionsResult);
        diagnozesResult.push(result);
    }
    return diagnozesResult;
}

function mapAnswers(baseKey, questionsResult) {
    const result = [];
    const keyBaseSplit = baseKey[0].split(';'); // ['101:1','102:0']

    // создаю ответы
    for (let key of keyBaseSplit) {
        if (!key) {
            continue;
        }
        const answer = mapAnswer(key, questionsResult);
        result.push(answer);
    }

    return result;
}


function mapAnswer(key, questionsResult) {
    const questionIndex = +key.split(',')[0].slice(1) - 1;
    const result = {};

    if (!questionsResult[questionIndex]) {
        console.log(1);
    }

    result.questionId = questionsResult[questionIndex]._id;
    result.status = !!+key[key.length - 1]; //беру последний символ из '101:1' и привожу его к булеву - это и есть ответ да или нет
    return result;
}

module.exports = { execute };