import React from 'react';
import { useArticle } from 'src/useCases/useArticle';
import { Box } from '../ui-kit/Box';
import { SunEditorShow } from '../ui-kit/SunEditorShow';
import { Container } from '../ui-kit/Container';

export const ArticleShow = ({ articleId }) => {

    const { article, isLoaded } = useArticle({ articleId });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <h2>{article.title}</h2>
            <SunEditorShow text={article.text} />
        </Container>
    );
};
