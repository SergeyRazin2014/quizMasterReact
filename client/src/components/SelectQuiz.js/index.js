import React from 'react';
import Categories from 'src/components/Categories';
import Quizes from 'src/components/Quizes';
import { Row, Col } from 'antd';
import { useSelectedQuizes } from '../../redux/reducers/quizReducer';
import './index.css';

const SelectQuiz = () => {

    const selectedQuizes = useSelectedQuizes();

    const isShowQuizList = !!(selectedQuizes && selectedQuizes.length);

    return (
        <div className='selectQuizWrapper'>
            <Row>
                <Col span={12}>
                    <Categories />
                </Col>
                {isShowQuizList && <Col span={12}>
                    <Quizes quizList={selectedQuizes} />
                </Col>}
            </Row>
        </div>
    );
};

export default SelectQuiz;