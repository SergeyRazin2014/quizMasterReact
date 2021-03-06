import React from 'react';
import { List } from 'antd';
import { QuizLinkItem } from './components/quizLinkItem';

import 'antd/dist/antd.css';
import './index.css';

// список тестов
const Quizes = ({ quizList }) => {
    if (!quizList || !quizList.length) {
        return null;
    }


    return (
        <List
            size="small"
            header={<div className='selectQuizTitle' >Выберите тест</div>}
            bordered
            dataSource={quizList}
            renderItem={QuizLinkItem}
        />
    );
};

export default Quizes;