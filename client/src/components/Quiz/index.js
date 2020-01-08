/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useQuiz } from 'src/useCases/useQuiz';
import { findDiagnoz } from './infrastructure/quizHelper';
import { QuestionModal } from './components/QuestionModal';
import { AnswersList } from 'src/components/Quiz/components/AnswersList';
import { SunEditorShow } from '../ui-kit/SunEditorShow';
import { Container } from 'src/components/ui-kit/Container';
import { Box } from 'src/components/ui-kit/Box';
import { Button } from 'antd';
import { navigate } from 'hookrouter';
import './index.css';

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
		<Container >
			<Box className="print">
				{!findedDiagnoz && hasQuestions && <QuestionModal
					isModalVisible={isModalVisible}
					okClick={okClick}
					noClick={noClick}
					title={`Вопрос № ${questionIndex + 1}. (Тест: ${quiz.title})`}
					text={currentQuestion.text} />
				}
				<AnswersList answersList={answers} />
				{findedDiagnoz && <Box mt={10} ><SunEditorShow text={findedDiagnoz.text} /></Box>}
				{!findedDiagnoz && !hasQuestions && < Box mt={10} ><SunEditorShow text="<strong>Диагноз определить не удалось, обратитесь к врачу.</strong>" /></Box>}
			</Box>
			{!hasQuestions &&
				<Box mt={10}>
					<Button type="primary" onClick={() => window.print()} >Печать</Button>
					<Button style={{ marginLeft: "10px" }} type="primary" onClick={() => navigate('/')} >Завершить</Button>
					<Button style={{ marginLeft: "10px" }} type="primary" onClick={() => location.reload()} >Пройти еще раз</Button>
				</Box>
			}
		</Container >
	);
};

export default Quiz;
