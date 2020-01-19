/* eslint-disable no-restricted-globals */
import React from 'react';
import { Container } from 'src/components/ui-kit/Container';
import { useCategoriesList } from 'src/useCases/useCategoriesList';
import { Spinner } from 'src/components/ui-kit/Spinner';
import { useCategories } from 'src/useCases/useCategories';
import { Table, Tree, Button, Popover, Input, Icon, message } from 'antd';
import { Box } from 'src/components/ui-kit/Box';
import { A, navigate } from 'hookrouter';
import { openNotification, notificationTypes } from 'src/components/ui-kit/Modal/Notification';
import { api } from 'src/api';
import { showSaveResult } from 'src/common/showSaveResult';

export const CategoriesAdm = () => {

    // const { allCategories, isLoaded } = useCategoriesList();
    const { rootCategory, setAllCategories, allCategories, isLoaded } = useCategories();

    if (!isLoaded) {
        return <Spinner />;
    }

    const handleDelete = (category) => {
        if (category.children && category.children.length > 0) {
            openNotification({ message: `Категорию ${category.title} удалить нельзя, т.к. она содержит дочерние категории, удалите сначала все дочерние категории!`, type: notificationTypes.error });
            return;
        }

        api.delete(`/deleteCategory/${category._id}`).then(response => {
            if (response.status === 200) {
                showSaveResult(response, "Категория удалена успешно");
                location.reload();
            } else {
                openNotification({ message: "Ошибка удаление категории", type: notificationTypes.error });
            }
        }).catch(err => {
            openNotification({ message: "Ошибка удаление категории", type: notificationTypes.error });
        });
    };


    const renderCategories = (category) => {

        const content = (
            <div>
                <A href={`/admin/updateCategory/${category._id}`} >Изменить</A>
                <Box>
                    <a style={{ color: "red" }} onClick={() => handleDelete(category)}> Удалить</a>
                </Box>
            </div>
        );


        let nodeTitle = (<Popover trigger="click" content={content}><span className="categoryItem"> {category.title} </span></Popover>);

        if (category.isRoot) {
            nodeTitle = (<span className="categoryItem"> {category.title} </span>);
        }


        return (
            <Tree.TreeNode title={nodeTitle} key={category._id}>
                {category.childOb.map(x => renderCategories(x))}
            </Tree.TreeNode>
        );
    };

    const onDrop = (info) => {
        const dragKey = info.dragNode.props.eventKey;
        const dropKey = info.node.props.eventKey;

        // найти категорию с dragKey
        // const dragCategory = allCategories.find(x => x._id === dragKey);

        for (let i = 0; i < allCategories.length; i++) {
            const categoryItem = allCategories[i];
            categoryItem.children = categoryItem.children.filter(id => id !== dragKey);
        }

        // найти категорию с ключем dropKey
        const dropCategory = allCategories.find(x => x._id === dropKey);

        if (dropCategory) {
            //  в ее children положить dragKey
            dropCategory.children.push(dragKey);
        }

        setAllCategories([...allCategories]);
    };

    const handleSave = () => {
        api.post('/updateAllCategories', allCategories).then(response => {
            showSaveResult(response, "Категории сохранены успешно");
        }).catch(err => {
            openNotification({ message: "Ошибка сохранения категорий", type: notificationTypes.error });
        });
    };

    return (
        <Container>
            <Box mt={10} mb={10}>
                <Popover placement="topLeft" content="Добавить категорию">
                    <Button type="primary" shape="circle-outline" icon="plus" onClick={() => navigate('/admin/addCategory')} />
                </Popover>
            </Box>
            <Tree draggable onDrop={onDrop} >
                {renderCategories(rootCategory)}
            </Tree >
            <Box mt={20}>
                <Button onClick={handleSave} type="primary" >Сохранить</Button>
            </Box>

        </Container>
    );
};
