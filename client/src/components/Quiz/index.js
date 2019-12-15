import React, { useState, useEffect } from 'react';
import { useQuiz } from 'src/useCases/useQuiz';
import { Modal } from 'antd';
import { findDiagnoz } from './infrastructure/quizHelper';
import { QuestionModal } from './components/QuestionModal';
import { AnswersList } from 'src/components/Quiz/components/AnswersList';
import { Diagnoz } from 'src/components/Quiz/components/Diagnoz';

const Quiz = (props) => {

	const { id: _id } = props;
	const { quiz, isLoaded } = useQuiz({ _id });
	const [questionIndex, setQuestionIndex] = useState(0);
	const [isModalVisible, setModalVisible] = useState(true);
	const [answers, setAnswers] = useState([]);
	const hasQuestions = !!quiz && !!quiz.questions && questionIndex < quiz.questions.length;
	const currentQuestion = isLoaded ? quiz.questions[questionIndex] : null;
	const [findedDiagnoz, setFindedDiagnoz] = useState(null);

	// поиск диагноза
	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		const diagnosFind = findDiagnoz({ quiz, answers });

		if (diagnosFind) {
			setFindedDiagnoz(diagnosFind);
		}
	}, [answers]);

	// показываю диагноз если найден
	useEffect(() => {
		if (findedDiagnoz) {
			Modal.success({ content: findedDiagnoz.text });
		}
	}, [findedDiagnoz]);

	const setAnswerStatus = ({ status }) => {
		setModalVisible(false);
		setTimeout(() => {

			const answersNew = [...answers, { text: currentQuestion.text, questionId: currentQuestion._id, status }];

			// установить результат ответа
			setAnswers(answersNew);
			setQuestionIndex(questionIndex + 1);
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

	return (
		<>
			{!findedDiagnoz && hasQuestions && <QuestionModal
				isModalVisible={isModalVisible}
				okClick={okClick}
				noClick={noClick}
				title={`Вопрос № ${questionIndex + 1}. (Тест: ${quiz.title})`}
				text={currentQuestion.text} />
			}
			<AnswersList answersList={answers} />
			<Diagnoz diagnoz={findedDiagnoz} />
		</>
	);
};

export default Quiz;
