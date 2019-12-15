import React from 'react';
import { List } from 'antd';


const ListItem = (item) => {

    return (
        <List.Item className='itemName' key={item._id} >
            <span>{item.text}</span>
            <span>{item.status ? 'Да' : 'Нет'}</span>
        </List.Item>
    );
};

export const AnswersList = ({ answersList }) => {

    if (!answersList || !answersList.length) {
        return null;
    }

    return <List
        size="small"
        header={<div className='selectQuizTitle' >Результат:</div>}
        bordered
        dataSource={answersList}
        renderItem={ListItem}
    />;
}