import React, { useState, useCallback } from 'react';
import { useQuiz } from 'src/useCases/useQuiz';
import { Box } from 'src/components/ui-kit/Box';
import { Input, Table, Button } from 'antd';
import { DeleteQuestion } from 'src/components/Admin/QuizAdm/Actions/DeleteQuestion';
import { AddQuestion } from 'src/components/Admin/QuizAdm/Actions/AddQuestion';
import { NotEmptyInput } from 'src/components/Admin/QuizAdm/forms/fields/NotEmptyInput';

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

        // render: (text, record) => <Input value={text} />
        render: (text, record) => {
            const currentName = `question_${record._id}`;
            return (
                <NotEmptyInput text={text} record={record} name={currentName} />
            );
        }
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

export const QuizUpdateForm = (props) => {

    const { quizId: _id } = props;
    const { quiz, setQuiz, isLoaded } = useQuiz({ _id });
    const [errors, setErrors] = useState({});

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

    // отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const validateTitle = (value, name) => {
        if (!value) {
            errors[name] = 'Required';
        } else {
            errors[name] = null;
        }
    };

    const onChangeQuiz = (e) => {
        setQuiz({ ...quiz, [e.target.name]: e.target.value });
        validateTitle(e.target.value, e.target.name);
    };

    return (
        <Box p={'20px'} color='black' >
            <form onSubmit={handleSubmit}>
                <p>
                    <strong>Id:</strong>  {quiz._id}
                </p>
                <p>
                    <strong>Номер:</strong> {quiz.number}
                </p>

                <Box>
                    <strong>Заголовок:</strong>
                    <Input value={quiz.title} name='title' onChange={onChangeQuiz} />
                    {errors.title && <p style={{ color: 'red' }} >Required</p>}

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
                    <Button htmlType="submit" type="primary" >Сохранить</Button>
                </Box>
            </form>
        </Box>
    );
};
