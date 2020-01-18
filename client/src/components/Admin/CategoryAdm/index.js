import React, { useState, useEffect } from 'react';
import { Input, Select, Button } from 'antd';
import { Container } from 'src/components/ui-kit/Container';
import { useCategoriesList } from 'src/useCases/useCategoriesList';
import { Spinner } from 'src/components/ui-kit/Spinner';
import { Box } from 'src/components/ui-kit/Box';
import { api } from 'src/api';
import { useCategory } from 'src/useCases/useCategory';
import { showSaveResult } from 'src/common/showSaveResult';
import { navigate } from 'hookrouter';

export const CategoryAdm = ({ categoryId }) => {

    const { category, setCategory, isLoaded } = useCategory({ id: categoryId });

    // const [categoryTitle, setCategoryTitle] = useState(null);

    // const { allCategories, isLoaded } = useCategoriesList();

    if (!isLoaded) {
        return <Spinner />;
    }

    // const categoryList = allCategories.map(cat => {
    //     return <Select.Option key={cat._id} value={cat._id}>{cat.title}</Select.Option>;
    // });

    const onSubmit = (e) => {
        e.preventDefault();
        if (categoryId) {
            api.post('/updateCategory', category).then(response => {
                showSaveResult(response, 'Категория успешно сохранена');
            });

        } else {
            api.post('/addCategory', category).then(response => {
                showSaveResult(response, 'Категория успешно сохранена');
            });
        }
    };

    const handleChange = (e) => {
        setCategory({ ...category, title: e.target.value });
    };

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <p><strong>Заголовок категории</strong></p>
                <Input value={category.title} onChange={handleChange} required />

                {/* <Box mt={10}>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Выберите категорию"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {categoryList}
                    </Select>
                </Box> */}
                <Box mt={10} >
                    <Button type="primary" htmlType="submit">Сохранить</Button>
                    <Button style={{ marginLeft: '10px' }} type="secondary" onClick={() => navigate('/admin/categoriesAdm')} >Отмена</Button>
                </Box>
            </form>
        </Container>
    );
};
