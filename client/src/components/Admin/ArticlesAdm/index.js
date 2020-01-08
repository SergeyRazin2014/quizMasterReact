import React from 'react';
import { Table, Button, Popover } from 'antd';
import { useArticles } from 'src/useCases/useArticles';
import { Box } from 'src/components/ui-kit/Box';
import { A, navigate } from 'hookrouter';
import { api } from 'src/api';

export const ArticlesAdm = () => {

    const { articles, isLoading } = useArticles();

    // столбцы вопросов
    const columnsArticles = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            width: '5%',
        },
        {
            title: 'Заголовок статьи',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,

            render: (text, record) => {
                return (<A href={`/admin/article/${record._id}`}>{text}</A>);
            }
        },

        {
            title: 'reff',
            key: 'reff',
            render: (text, record) => {
                return <p>{`/articleShow/${record._id}`}</p>;
            }
        },

        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            width: '20%',
        },
        {
            title: '',
            key: 'delete',
            width: '3%',
            render: (text, record) => <Button icon="delete" shape="circle" type="danger" onClick={() => {
                api.delete(`/deleteArticle/${record._id}`).then(response => {
                    if (response.status === 200) {
                        alert('Статья успешно удалена');
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                    } else {
                        alert('Ошибка удаления статьи: ' + response.data);
                    }
                });
            }} />
        }
    ];

    if (!isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Box mt={10} ml={20} mr={20}>
            <Table size="small" bordered pagination={false} dataSource={articles} columns={columnsArticles} />
            <Box mt={10}>
                <Popover placement="topLeft" content="Добавить статью">
                    <Button type="primary" shape="circle-outline" icon="plus" onClick={() => navigate('/admin/addArticle')} />
                </Popover>
            </Box>
        </Box>
    );
};
