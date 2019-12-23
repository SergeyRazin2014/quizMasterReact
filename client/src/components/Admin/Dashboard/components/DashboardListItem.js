import React from 'react';
import { List } from 'antd';
import { navigate } from 'hookrouter';
import uuid from 'uuid';

export const DashboardListItem = ({ name, title }) => {

    const handleClick = () => {
        // переход на страницу с тестом
        navigate(`/admin/${name}`);
    };

    const key = uuid.v4();

    return (
        <List.Item className='itemName' key={key} onClick={handleClick} >
            <span className="pointer">{title}</span>
        </List.Item>
    );
};