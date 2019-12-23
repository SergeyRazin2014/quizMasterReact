import React from 'react';
import { DashboardListItem } from './components/DashboardListItem';
import { List } from 'antd';

export const Dashboard = () => {

    const itemList = [{ name: 'categories', title: 'Категории' }, { name: 'quzes', title: 'Тесты' }, { name: 'articles', title: 'Статьи' }];

    return (
        <List
            size="small"
            header={<div className='selectQuizTitle' >Выберите</div>}
            bordered
            dataSource={itemList}
            renderItem={DashboardListItem}
        />
    );
};