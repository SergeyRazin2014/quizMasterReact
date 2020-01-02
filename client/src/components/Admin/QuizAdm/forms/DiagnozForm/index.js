import React, { useState, useEffect } from 'react';
import { Modal, Input, Table, Button } from 'antd';
import { Box } from 'src/components/ui-kit/Box';


export const DiagnozForm = ({ diagnoz, setSelectedDiagnoz, quiz, setQuiz }) => {

    const [diagClone, setDiagClone] = useState(null);



    useEffect(() => {
        if (!diagnoz) {
            return;
        }
        // клонирую диагноз
        const dClone = { ...diagnoz };
        dClone.answers = diagnoz.answers.map(x => { return { ...x }; });
        setDiagClone(dClone);
    }, [diagnoz]);

    const onCancel = () => {
        setSelectedDiagnoz(null);
    };

    const onSave = () => {
        // сохранить quiz
        const findDiagnozIndex = quiz.diagnozes.findIndex(d => d.number === diagClone.number);

        if (findDiagnozIndex >= 0) {
            const before = quiz.diagnozes.slice(0, findDiagnozIndex);
            const after = quiz.diagnozes.slice(findDiagnozIndex + 1);
            const newDiagnozes = [...before, diagClone, ...after];
            setQuiz({ ...quiz, diagnozes: newDiagnozes });
        } else {
            const newDiagnozes = [...quiz.diagnozes, diagClone];
            setQuiz({ ...quiz, diagnozes: newDiagnozes });
        }

        setSelectedDiagnoz(null);
    };

    const setQuestionStatus = (question, status) => {

        const findQuestionIndex = diagClone.answers.findIndex(x => x.questionId === question._id);
        if (findQuestionIndex >= 0) {
            const before = diagClone.answers.slice(0, findQuestionIndex);
            const after = diagClone.answers.slice(findQuestionIndex + 1);
            const newAnswer = { questionId: question._id, status }
            setDiagClone({ ...diagClone, answers: [...before, newAnswer, ...after] });
        } else {
            const newAnswer = { questionId: question._id, status };
            diagClone.answers.push(newAnswer);
        }
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
                return (<p>{text}</p>);
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
            key: 'answer',
            width: '15%',

            render: (text, record) => {
                // это вопрос
                // найти в ответах этого диагноза этот вопрос
                // если  у найденного ответа статус - true - тогда да - зеленый цвет
                // если у найденного ответа статус - false - тогда да - черный цвет
                // если не найден ответ с таким статусо - тогда оставляем как есть

                const answer = diagClone.answers.find(a => a.questionId === record._id);

                const styleYesBtnChecked = { background: 'green' };
                const styleYesBtnNotChecked = { background: 'white' };
                const styleYesBtnEmpty = { background: 'gray' };

                let currentYesBtn = null;
                let currentNoBtn = null;

                if (answer && answer.status) {
                    currentYesBtn = styleYesBtnChecked;
                    currentNoBtn = styleYesBtnNotChecked;
                }

                if (answer && answer.status === false) {
                    currentYesBtn = styleYesBtnNotChecked;
                    currentNoBtn = styleYesBtnChecked;
                }

                if (!answer) {
                    currentYesBtn = styleYesBtnEmpty;
                    currentNoBtn = styleYesBtnEmpty;
                }

                return (
                    <Button.Group>
                        <Button type="dashed" icon="check-circle" onClick={() => setQuestionStatus(record, true)} style={currentYesBtn} >Да</Button>
                        <Button type="dashed" icon="close-circle" onClick={() => setQuestionStatus(record, false)} style={currentNoBtn} >Нет</Button>
                    </Button.Group>
                );
            }
        },


    ];

    return (
        diagnoz && <Modal
            title={diagnoz.text}
            visible={!!diagnoz}
            onOk={onSave}
            onCancel={onCancel}
            okText="Сохранить"
            cancelText="Отмена"
            width="90%"
            closable={false}
            maskClosable={false}
        >
            <p style={{ color: 'black' }} ><strong>Вопросы:</strong></p>
            <Table size="small" bordered pagination={false} dataSource={quiz.questions} columns={columnsQuestions} />
            <hr />
            <Box mt={10}>
                <p style={{ color: 'black' }} ><strong>Текст диагноза:</strong></p>
                <Input.TextArea value={diagnoz.text} rows={6} />
            </Box>

        </Modal>);
};