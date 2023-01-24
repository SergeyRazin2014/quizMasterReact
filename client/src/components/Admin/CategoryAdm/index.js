import React from 'react';
import { Input, Button } from 'antd';
import { Container } from 'src/components/ui-kit/Container';
import { Spinner } from 'src/components/ui-kit/Spinner';
import { Box } from 'src/components/ui-kit/Box';
import { api } from 'src/api';
import { useCategory } from 'src/useCases/useCategory';
import { showSaveResult } from 'src/common/showSaveResult';
import { navigate } from 'hookrouter';

export const CategoryAdm = ({ categoryId }) => {

    const { category, setCategory, isLoaded } = useCategory({ id: categoryId });

    if (!isLoaded) {
        return <Spinner />;
    }

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
                <Box mt={10} >
                    <Button type="primary" htmlType="submit">Сохранить</Button>
                    <Button style={{ marginLeft: '10px' }} type="secondary" onClick={() => navigate('/admin/categoriesAdm')} >Отмена</Button>
                </Box>
            </form>
        </Container>
    );
};
