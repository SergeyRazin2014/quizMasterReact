import React from 'react';
import { List } from 'antd';
import { useSelectedCategoryId } from 'src/redux/reducers/categoryReducer';

import 'antd/dist/antd.css';
import './index.css';

// заглушка для тестов
const quizList = [{ id: 1, name: 'Общее недомогание' }, { id: 2, name: 'Головные боли' }, { id: 3, name: 'Понос' }];

// экземпляр теста
const renderItem = (item) => {
    return <List.Item className='itemName' key={item.id} >{item.name}</List.Item>;
};

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
            renderItem={renderItem}
        />
    );
};

export default Quizes;