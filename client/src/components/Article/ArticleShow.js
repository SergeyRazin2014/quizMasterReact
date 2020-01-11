import React from 'react';
import { useArticle } from 'src/useCases/useArticle';
import { Box } from '../ui-kit/Box';
import { SunEditorShow } from '../ui-kit/SunEditorShow';
import { Container } from '../ui-kit/Container';
import { Spinner } from '../ui-kit/Spinner';

export const ArticleShow = ({ articleId }) => {

    const { article, isLoaded } = useArticle({ articleId });

    if (!isLoaded) {
        return <Spinner />;
    }

    return (
        <Container>
            <h2>{article.title}</h2>
            <SunEditorShow text={article.text} />
        </Container>
    );
};
