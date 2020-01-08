import React, { useState } from 'react';
import { Table, Button, Popover, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { useArticles } from 'src/useCases/useArticles';
import { Box } from 'src/components/ui-kit/Box';
import { A, navigate } from 'hookrouter';
import { api } from 'src/api';

export const ArticlesAdm = () => {

    const { articles, isLoading } = useArticles();
    const [searchInfo, setSearchInfo] = useState({});

    // -----------------------

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchInfo({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchInfo({ searchText: '' });
    };

    let searchInput = null;

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },

        // @ts-ignore
        render: text => (searchInfo.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                // @ts-ignore
                searchWords={[searchInfo.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ) : (
                text
            )),
    });

    // -----------------------

    // столбцы вопросов
    const columnsArticles = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            width: '5%',
            ...getColumnSearchProps('number')
        },
        {
            title: 'Заголовок статьи',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,

            render: (text, record) => {
                return (<A href={`/admin/article/${record._id}`}>{text}</A>);
            },
            ...getColumnSearchProps('title')
        },

        {
            title: 'reff',
            key: 'reff',
            render: (text, record) => {
                const ref = `/articleShow/${record._id}`;
                return (
                    <p style={{ display: 'flex', justifyContent: 'space-between' }}>{ref} <Button icon="copy" onClick={() => navigator.clipboard.writeText(ref)} /></p>
                );
            }
        },

        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            width: '20%',
            ...getColumnSearchProps('_id')
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
