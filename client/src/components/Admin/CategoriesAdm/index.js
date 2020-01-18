import React from 'react';
import { Container } from 'src/components/ui-kit/Container';
import { useCategoriesList } from 'src/useCases/useCategoriesList';
import { Spinner } from 'src/components/ui-kit/Spinner';
import { useCategories } from 'src/useCases/useCategories';
import { Table, Tree, Button, Popover, Input, Icon, message } from 'antd';
import { Box } from 'src/components/ui-kit/Box';
import { A, navigate } from 'hookrouter';

export const CategoriesAdm = () => {

    // const { allCategories, isLoaded } = useCategoriesList();
    const { rootCategory, allCategories, isLoaded } = useCategories();

    if (!isLoaded) {
        return <Spinner />;
    }

    const renderCategories = (rootCategory) => {

        const content = (
            <div>
                <A href={`/admin/updateCategory/${rootCategory._id}`} >Изменить</A>
                <p>Удалить</p>
            </div>
        );

        return (
            <Tree.TreeNode title={<Popover trigger="click" content={content}><span className="categoryItem"> {rootCategory.title} </span></Popover>} key={rootCategory._id}>
                {rootCategory.childOb.map(x => renderCategories(x))}
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
