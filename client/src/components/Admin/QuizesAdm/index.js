// @ts-nocheck
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Icon, Popover, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { useAllQuizes } from 'src/useCases/useAllQuizes';
import { A, navigate } from 'hookrouter';
import { api } from 'src/api';
import { Box } from 'src/components/ui-kit/Box';
import { showConfirm, modalStatuses } from 'src/components/ui-kit/Modal/Confirm';
import { Spinner } from 'src/components/ui-kit/Spinner';
import { useDiagnozesKeyNumbersAndCorrect } from 'src/components/Admin/QuizAdm/common/useDiagnozesKeyNumbersAndCorrect';


export const QuizesAdm = () => {

    const { isLoaded, allQuizes } = useAllQuizes();
    const [searchInfo, setSearchInfo] = useState({});
    const { useCase: setDiagnozesKeyNumbersAndCorrect } = useDiagnozesKeyNumbersAndCorrect();

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

    if (!isLoaded) {
        return <Spinner />;
    }

    allQuizes.forEach((quiz, index) => {
        quiz.key = quiz._id;
        quiz.isCorrectStr = 'Да';
        quiz.number = index + 1;

        setDiagnozesKeyNumbersAndCorrect(quiz);
    });

    const columns = [

        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            width: '5%',
            ...getColumnSearchProps('number'),
        },
        {
            title: 'Тест',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            ...getColumnSearchProps('title'),
            render: (text, record) => <A href={`/admin/quiz/${record._id}`}>{text}</A>
        },

        {
            title: 'Корректен',
            dataIndex: 'isCorrectStr',
            key: 'isCorrectStr',
            ...getColumnSearchProps('isCorrectStr'),
            render: (text, record) => {
                return record.isCorrectStr;
            }
        },

        {
            title: 'Ссылка',
            dataIndex: '_id',
            key: '_id',
            ...getColumnSearchProps('_id'),
            render: (text, record) => {
                const ref = `/quiz/${record._id}`;
                return (
                    <p style={{ display: 'flex', justifyContent: 'space-between' }}>{ref} <Button icon="copy" onClick={() => {
                        navigator.clipboard.writeText(ref).then(() => {
                            message.success('скопировал в буфер: ' + ref);
                        });
                    }} /></p>
                );
            }
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            width: `5%`,
            render: (text, record) => (
                <Button icon="delete" shape="circle" type="danger" onClick={() => {
                    showConfirm({ title: 'Вы действительно хотите удалить тест?' })
                        .then((status) => {
                            if (status === modalStatuses.ok) {
                                api.delete(`/deleteQuiz/${record._id}`).then((respons) => {
                                    if (respons.status === 200) {
                                        location.reload();
                                    }
                                });
                            }
                        });
                }} />
            )
        },
    ];
    return (
        <>
            <Box mt={10} ml={20} mr={20}>
                <Popover placement="topLeft" content="Создать новый тест">
                    <Button type="primary" shape="circle-outline" icon="plus" onClick={() => navigate('/admin/addQuiz')} />
                </Popover>
                <Box mt={10} >
                    <Table bordered size="small" columns={columns} dataSource={allQuizes} pagination={false} />
                </Box>
            </Box>
        </>
    );
};