import React, { useState, useEffect } from 'react';
import { useQuiz } from 'src/useCases/useQuiz';
import { Box } from 'src/components/ui-kit/Box';
import { Input, Table, Button } from 'antd';
import { DeleteQuestion } from 'src/components/Admin/QuizAdm/Actions/DeleteQuestion';
import { AddQuestion } from 'src/components/Admin/QuizAdm/Actions/AddQuestion';
import { Field, reduxForm } from 'redux-form';

// столбцы вопросов
const columnsQuestions = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        width: '5%',
    },
    {
        title: 'Текст',
        dataIndex: 'text',
        key: 'text',
        render: (text, record) => <Input value={text} />
    },
    {
        title: 'Id',
        dataIndex: '_id',
        key: 'id',
        width: '20%',
    },
    {
        title: '',
        key: 'delete',
        width: '3%',
        // render: (text, record) => <Button icon="delete" shape="circle" type="danger" />
        render: (text, record) => <DeleteQuestion question={record} />
    }
];

// столбцы диагнозов
const columnsDiagnozes = [
    {
        title: 'Текст',
        dataIndex: 'text',
        key: 'text',
        ellipsis: true,
        render: (text, record) => <Input value={text} />
    },
    {
        title: 'Ответы',
        dataIndex: 'answerKey',
        key: 'answerKey',
        width: '20%',
    },
    {
        title: 'Id',
        dataIndex: '_id',
        key: 'id',
        width: '20%',
    },
    {
        title: '',
        key: 'delete',
        width: '3%',
        render: (text, record) => <Button icon="delete" shape="circle" type="danger"></Button>
    }
];

const QuizUpdateForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, quizId: _id } = props;
    const { quiz, isLoaded } = useQuiz({ _id });
    const [quizTitle, setQuizTitle] = useState(null);

    useEffect(() => {
        if (quiz) {
            setQuizTitle(quiz.title);
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    // ключи для вопросов
    quiz.questions.forEach(x => {
        x.key = x._id;
    });

    // ключи для диагнозов
    quiz.diagnozes.forEach(diag => {
        diag.key = diag._id;

        diag.answerKey = '';
        diag.answers.forEach(a => {
            const findedQuestion = quiz.questions.find(question => question._id === a.questionId);
            const resultStr = `${findedQuestion.number}: ${a.status ? 'Да' : 'Нет'}`;
            diag.answerKey += ' ' + resultStr;
        });
    });

    return (
        <Box p={'20px'} color='black' >
            <form onSubmit={handleSubmit}>
                <p>
                    <strong>Id:</strong>  {quiz._id}
                </p>
                <p>
                    <strong>Номер:</strong> {quiz.number}
                </p>
                <Field
                    name="lastName"
                    component="input"
                    type="text"
                    placeholder="last name"
                />
                <Box>
                    <strong>Заголовок:</strong>
                    <Input value={quizTitle} onChange={(e) => { setQuizTitle(e.target.value); }} />
                </Box>
                <Box mt={20}>
                    <strong>Вопросы:</strong>
                    <Table size="small" bordered pagination={false} dataSource={quiz.questions} columns={columnsQuestions} />
                    <Box mt={10}>
                        <AddQuestion quiz={quiz} />
                    </Box>
                </Box>
                <Box mt={20}>
                    <strong>Диагнозы:</strong>
                    <Table bordered pagination={false} size="small" dataSource={quiz.diagnozes} columns={columnsDiagnozes} />
                    <Box mt={10}>
                        <Button type="primary" shape="circle-outline" icon="plus" />
                    </Box>
                </Box>

                <Box mt={20}>
                    <Button htmlType="submit" type="primary" onClick={handleSubmit} >Сохранить</Button>
                </Box>
            </form>
        </Box>
    );
};


export default reduxForm({ form: 'updateQuiz' })(QuizUpdateForm);