import React from 'react';
import { List } from 'antd';
import { navigate } from 'hookrouter';


export const QuizLinkItem = (item) => {

    const handleClick = () => {
        // переход на страницу с тестом
        navigate(`/quiz/${item._id}`);
    };

    return (<List.Item className='itemName' key={item._id} onClick={handleClick} >
        <span className="pointer">{item.title}</span>
    </List.Item>);
};