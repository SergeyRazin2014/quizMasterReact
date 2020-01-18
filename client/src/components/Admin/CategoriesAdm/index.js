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
    const { rootCategory, allCategories, isLoaded } = useCategories();

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

        return (
            <Tree.TreeNode title={<Popover trigger="click" content={content}><span className="categoryItem"> {category.title} </span></Popover>} key={category._id}>
                {category.childOb.map(x => renderCategories(x))}
            </Tree.TreeNode>
        );
    };

    const categoriesElements = renderCategories(rootCategory);

    return (
        <Container>
            <Box mt={10} mb={10}>
                <Popover placement="topLeft" content="Добавить категорию">
                    <Button type="primary" shape="circle-outline" icon="plus" onClick={() => navigate('/admin/addCategory')} />
                </Popover>
            </Box>
            <Tree draggable>
                {categoriesElements}
            </Tree >

        </Container>
    );
};
