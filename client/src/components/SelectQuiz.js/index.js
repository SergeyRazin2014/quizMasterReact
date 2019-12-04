import React from 'react';
import Categories from 'src/components/Categories';
import Quizes from 'src/components/Quizes';
import { Row, Col } from 'antd';
import { useSelectedQuizes } from '../../redux/reducers/quizReducer';
import './index.css';

const SelectQuiz = ({ selectedQuiz }) => {

    selectedQuiz = useSelectedQuizes();
    debugger;

    return (
        <div className='selectQuizWrapper'>
            <Row>
                <Col span={12}>
                    <Categories />
                </Col>
                {selectedQuiz && selectedQuiz.length && <Col span={12}>
                    <Quizes quizList={selectedQuiz} />
                </Col>}
            </Row>
        </div>
    );
};

export default SelectQuiz;