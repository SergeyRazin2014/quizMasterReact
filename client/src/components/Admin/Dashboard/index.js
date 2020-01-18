import React from 'react';
import { DashboardListItem } from './components/DashboardListItem';
import { List } from 'antd';
import { Container } from 'src/components/ui-kit/Container';

export const Dashboard = () => {

    const itemList = [{ name: 'categoriesAdm', title: 'Категории' }, { name: 'quizes', title: 'Тесты' }, { name: 'articles', title: 'Статьи' }];

    return (
        <Container>
            <List
                size="small"
                header={<div className='selectQuizTitle' >Разделы:</div>}
                bordered
                dataSource={itemList}
                renderItem={DashboardListItem}
            />
        </Container>
    );
};