import React from 'react';
import { DashboardListItem } from './components/DashboardListItem';
import { List, Button } from 'antd';
import { Container } from 'src/components/ui-kit/Container';
import useCreateBackupCategories from 'src/useCases/backup/useCreateBackupCategories';
import useCreateBackupQuizes from 'src/useCases/backup/useCreateBackupQuizes';
import useCreateBackupArticles from 'src/useCases/backup/useCreateBackupArticles';

export const Dashboard = () => {

    const itemList = [{ name: 'categoriesAdm', title: 'Категории' }, { name: 'quizes', title: 'Тесты' }, { name: 'articles', title: 'Статьи' }];
    const { usecase: backupCategories } = useCreateBackupCategories();
    const { usecase: backupQuizes } = useCreateBackupQuizes();
    const { usecase: backupArticles } = useCreateBackupArticles();

    const createDump = () => {
        // получить все категории и сохранить их в файл
        // получить все тесты и сохранить их в файл
        // получить все статьи и сохранить их в файл
        backupCategories();
        backupQuizes();
        backupArticles();
    };

    return (
        <div style={{ height: '100vh' }}>
            <Container>
                <List
                    size="small"
                    header={<div className='selectQuizTitle' >Разделы:</div>}
                    bordered
                    dataSource={itemList}
                    renderItem={DashboardListItem}
                />

                <Button type='primary' style={{ position: "absolute", bottom: '10px' }} onClick={createDump} >Сделать резервную копию</Button>
            </Container>
        </div>
    );
};