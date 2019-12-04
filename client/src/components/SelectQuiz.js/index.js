import React from 'react';
import Categories from 'src/components/Categories';
import Quizes from 'src/components/Quizes';
import { Row, Col } from 'antd';
import './index.css';

const SelectQuiz = () => {
    return (
        <div className='selectQuizWrapper'>
            <Row>
                <Col span={12}>
                    <Categories />
                </Col>
                <Col span={12}>
                    <Quizes />
                </Col>
            </Row>
        </div>
    );
};

export default SelectQuiz;