
const Quiz = require('../models/quiz');
const CategoryModel = require('../models/category');
const quizesResult = require('./quizResult.json');
const problemGroupsResult = require('./problemgroupsResult.json');

async function execute() {
    await importCategories();
    await importQuiz();
}

async function importQuiz() {
    for (let newQuiz of quizesResult) {
        try {
            const quiz = new Quiz(newQuiz);
            await quiz.save();
        } catch (err) {
            console.log(err);
        }
    }
}

async function importCategories() {
    for (let newGroup of problemGroupsResult) {
        try {
            const group = new CategoryModel(newGroup);
            await group.save();
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { importQuiz, importCategories, execute };






