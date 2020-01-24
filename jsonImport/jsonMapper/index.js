const quizParser = require('./quizParser/quizParser');
const categoryParser = require('./cateogryParser/categoryParser');

async function execute() {
    await categoryParser.execute();
    await quizParser.execute();
}

execute();