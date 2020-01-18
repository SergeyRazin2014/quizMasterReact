import React from 'react';
import { Input, Button } from 'antd';
import { Box } from 'src/components/ui-kit/Box';
import { useArticle } from 'src/useCases/useArticle';
import { LabelBox } from 'src/components/ui-kit/LabelBox/index';
import { api } from 'src/api';
import SunEditor, { buttonList } from 'suneditor-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'suneditor/dist/css/suneditor.min.css';
import { navigate } from 'hookrouter';
import { Spinner } from 'src/components/ui-kit/Spinner';
import { showSaveResult } from 'src/common/showSaveResult';

export const ArticleAdm = ({ articleId: _id }) => {
    const { article, setArticle, isLoaded } = useArticle({ articleId: _id });

    const changeArticleTitle = (e) => {
        setArticle({ ...article, title: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // этот костыль нужен т.к. метод onChange у sunEditor срабатывает с задержкой и если нажать submit очень быстро после исправления текста, то внесенные изменения не успеют папасть в отправляемые данные
        const editorValue = e.target.getElementsByClassName('se-wrapper-inner se-wrapper-wysiwyg sun-editor-editable')[0].innerHTML;
        article.text = editorValue;

        if (_id) {
            api.post('/updateArticle', article).then(response => {
                showSaveResult(response, 'статья успешно сохранена');
            });
        } else {
            api.post('/addArticle', article).then(response => {
                showSaveResult(response, 'статья успешно сохранена');
            });
        }
    };

    if (!isLoaded) {
        return <Spinner />;
    }

    const editorContent = article.text;

    return (
        <Box mt={10} ml={20} mr={20}>
            <form onSubmit={handleSubmit}>
                <Box>
                    <LabelBox>Заголовок статьи:</LabelBox>
                    <Input value={article.title} onChange={changeArticleTitle} />
                </Box>
                <Box mt={10}>
                    <LabelBox>Текст статьи:</LabelBox>
                    <SunEditor
                        // @ts-ignore
                        lang="ru"
                        setOptions={{
                            buttonList: buttonList.complex
                        }}
                        setContents={editorContent}
                    />
                </Box>
                <Box mt={20}>
                    <Button htmlType="submit" type="primary" >Сохранить</Button>
                    <Button style={{ marginLeft: '10px' }} type="secondary" onClick={() => navigate('/admin/articles')} >Отмена</Button>
                </Box>
            </form>
        </Box>
    );
};
