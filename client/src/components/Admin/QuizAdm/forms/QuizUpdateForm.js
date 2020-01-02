import React, { useState, useCallback } from 'react';
import { useQuiz } from 'src/useCases/useQuiz';
import { Box } from 'src/components/ui-kit/Box';
import { Input, Table, Button } from 'antd';
import { DiagnozForm } from './DiagnozForm';
import { api } from 'src/api/index';
import uuid from 'uuid';
import objectid from 'objectid';

export const QuizUpdateForm = (props) => {

    const { quizId: _id } = props;
    const { quiz, setQuiz, isLoaded } = useQuiz({ _id });
    const [selectedDiagnoz, setSelectedDiagnoz] = useState(null);

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    // ключи для вопросов
    quiz.questions.forEach((q, index) => {
        q.key = q._id;
        q.number = index + 1;
    });

    // ключи для диагнозов
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
        });
    });

    // отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/updateQuiz', quiz);
    };

    // изменить заголовок теста
    const onChangeQuizTitle = (e) => {
        setQuiz({ ...quiz, title: e.target.value });
    };

    // добавить вопрос
    const addQuestion = () => {
        const newQuestion = { _id: objectid(), number: quiz.questions.length + 1, text: "" };
        setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
    };

    // удалить вопрос
    const deleteQuestion = (record) => {

        // если хоть один из диагнозов ссылается на удаляемый вопрос
        const findDiagnos = quiz.diagnozes.find(d => d.answers.some(a => a.questionId === record._id));
        if (findDiagnos) {
            alert(`Диагноз: "${findDiagnos.text}" ссылается на данный вопрос.`);
            return;
        }

        const questions = quiz.questions.filter(x => x.number !== record.number);

        setQuiz({ ...quiz, questions: [...questions] });
    };

    // изменить вопрос
    const changeQuery = (e, text, record) => {
        const question = quiz.questions.find(x => x.number === record.number);
        question.text = e.target.value;
        setQuiz({ ...quiz });
    };

    // добавить диагноз
    const addDiagnoz = () => {
        const newDiagnoz = { text: 'Новый диагноз', answers: [] };
        setQuiz({ ...quiz, diagnozes: [...quiz.diagnozes, newDiagnoz] });
    };

    // удалить диагноз
    const deleteDiagnoz = (record) => {
        const newDiagnoses = quiz.diagnozes.filter(x => x.number !== record.number);
        setQuiz({ ...quiz, diagnozes: [...newDiagnoses] });
    };

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

            render: (text, record) => {
                const currentName = `question_${record._id}`;
                return (
                    <Input value={text} name={currentName} onChange={(e => changeQuery(e, text, record))} required />
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
            render: (text, record) => <Button icon="delete" shape="circle" type="danger" onClick={() => deleteQuestion(record)} />
        }
    ];

    // столбцы диагнозов
    const columnsDiagnozes = [
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
            ellipsis: true,
            render: (text, record) => <Button type='link' onClick={() => setSelectedDiagnoz(record)} >{text}</Button>
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
            render: (text, record) => <Button icon="delete" shape="circle" type="danger" onClick={() => deleteDiagnoz(record)} />
        }
    ];


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
                    <Input value={quiz.title} name='title' onChange={onChangeQuizTitle} required />
                </Box>
                <Box mt={20}>
                    <strong>Вопросы:</strong>
                    <Table size="small" bordered pagination={false} dataSource={quiz.questions} columns={columnsQuestions} />
                    <Box mt={10}>
                        <Button type="primary" shape="circle-outline" icon="plus" onClick={addQuestion} />
                    </Box>
                </Box>
                <Box mt={20}>
                    <strong>Диагнозы:</strong>
                    <Table bordered pagination={false} size="small" dataSource={quiz.diagnozes} columns={columnsDiagnozes} />
                    <Box mt={10}>
                        <Button type="primary" shape="circle-outline" icon="plus" onClick={addDiagnoz} />
                    </Box>
                </Box>

                <Box mt={20}>
                    <Button htmlType="submit" type="primary" >Сохранить</Button>
                </Box>
            </form>
            <DiagnozForm diagnoz={selectedDiagnoz} setSelectedDiagnoz={setSelectedDiagnoz} quiz={quiz} setQuiz={setQuiz} />
        </Box>
    );
};
