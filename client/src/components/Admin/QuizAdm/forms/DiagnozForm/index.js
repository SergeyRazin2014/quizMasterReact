import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Input, Table, Button } from 'antd';
import { Box } from 'src/components/ui-kit/Box';
import SunEditor, { buttonList } from 'suneditor-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'suneditor/dist/css/suneditor.min.css';


export const DiagnozForm = ({ diagnoz, setSelectedDiagnoz, quiz, setQuiz }) => {
    const [diagClone, setDiagClone] = useState(null);
    const [editorText, setEditorText] = useState(!!diagnoz ? diagnoz.text : '');

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

        // беру текст из ричэдитора, т.к. рич эдитор кеширует сущьность теста и на нее ссылаться не может при изменении
        diagClone.text = editorText;

        // сохранить quiz
        const findDiagnozIndex = quiz.diagnozes.findIndex(d => d.number === diagClone.number);
        let newDiagnozes = null;

        if (findDiagnozIndex >= 0) {
            const before = quiz.diagnozes.slice(0, findDiagnozIndex);
            const after = quiz.diagnozes.slice(findDiagnozIndex + 1);
            newDiagnozes = [...before, diagClone, ...after];

        } else {
            newDiagnozes = [...quiz.diagnozes, diagClone];
        }

        setQuiz({ ...quiz, diagnozes: newDiagnozes });
        setSelectedDiagnoz(null);

    };

    const deleteQuestionFromDiag = (question) => {
        const newAnswers = diagClone.answers.filter(a => a.questionId !== question._id);
        setDiagClone({ ...diagClone, answers: newAnswers });
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
            setDiagClone({ ...diagClone, answers: [...diagClone.answers, newAnswer] });
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
            ellipsis: true,

            render: (text) => {
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
            width: '20%',

            render: (text, record) => {
                const answer = diagClone.answers.find(a => a.questionId === record._id);

                const styleYesBtnChecked = { background: 'green' };
                const styleYesBtnNotChecked = { background: 'white' };
                const styleYesBtnEmpty = { background: 'lightgray' };

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
                        <Button type="dashed" icon="delete" onClick={() => deleteQuestionFromDiag(record)} />
                    </Button.Group>
                );
            }
        },


    ];

    // изменить текст диагноза
    const diagTextChange = (text) => {
        setEditorText(text);
    };

    // изменить заголовок диагзноза
    const diagTitleChange = (e) => {
        setDiagClone({ ...diagClone, title: e.target.value });
    };

    const editorContent = !!diagClone ? diagClone.text : '';

    if (!diagClone) {
        return null;
    }

    return (
        <Modal
            title='Настройка диагноза'
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
            <Box mt={10}>
                <p style={{ color: 'black' }} ><strong>Заголовок диагноза:</strong></p>
                <Input value={diagClone.title} onChange={diagTitleChange} />
            </Box>
            <Box mt={10}>
                <p style={{ color: 'black' }} ><strong>Текст диагноза:</strong></p>
                <SunEditor
                    // @ts-ignore
                    lang="ru"
                    setOptions={{
                        buttonList: buttonList.complex
                    }}
                    setContents={editorContent}
                    onChange={diagTextChange}
                />
            </Box>


        </Modal >);
};