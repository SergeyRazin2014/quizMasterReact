import React, { useState, useEffect } from 'react';
import { useQuiz } from 'src/useCases/useQuiz';
import { Modal, Button } from 'antd';
import { findDiagnos } from './infrastructure/quizHelper';

const Quiz = (props) => {

	const { id: _id } = props;
	const { quiz, isLoaded } = useQuiz({ _id });
	const [queryIndex, setQueryIndex] = useState(0);
	const [isModalVisible, setModalVisible] = useState(true);
	const [answers, setAnswers] = useState([]);
	const hasQuestions = !!quiz && !!quiz.questions && queryIndex < quiz.questions.length;
	const currentQuestion = isLoaded ? quiz.questions[queryIndex] : null;
	const [findedDiagnos, setFindedDiagnos] = useState(null);


	// поиск диагноза
	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		const diagnosFind = findDiagnos({ quiz, answers });

		if (diagnosFind) {
			setFindedDiagnos(diagnosFind);
		}
	}, [answers]);

	// показываю диагноз если найден
	useEffect(() => {
		if (findedDiagnos) {
			Modal.success({ content: findedDiagnos.text });
		}
	}, [findedDiagnos]);

	const setAnswerStatus = ({ status }) => {
		setModalVisible(false);
		setTimeout(() => {

			const answersNew = [...answers, { questionId: currentQuestion._id, status }];

			// установить результат ответа
			setAnswers(answersNew);
			setQueryIndex(queryIndex + 1);
			if (hasQuestions) {
				setModalVisible(true);
			}
		}, 400);
	};


	if (!isLoaded) {
		return <p>Loading...</p>;
	}


	const okClick = () => {
		setAnswerStatus({ status: true });
	};

	const noClick = () => {
		setAnswerStatus({ status: false });
	};

	console.log(answers);







	return (
		<>
			{hasQuestions && <Modal
				title={`Вопрос 1${quiz.title}`}
				visible={isModalVisible}
				onOk={() => okClick()}
				onCancel={() => noClick()}
				okText="ДА"
				cancelText="НЕТ"
				width="90%"
				closable={false}
				maskClosable={false}
			>
				<p>{currentQuestion.text}</p>
			</Modal>}
			<Button type="primary" onClick={() => alert('click')}>Продолжить</Button>
		</>
	);

};

export default Quiz;
