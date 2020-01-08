import React from 'react';
import { useArticle } from 'src/useCases/useArticle';
import { Box } from '../ui-kit/Box';
import { SunEditorShow } from '../ui-kit/SunEditorShow';

export const ArticleShow = ({ articleId }) => {

    const { article, isLoaded } = useArticle({ articleId });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <Box>
            <h2>{article.title}</h2>
            <SunEditorShow text={article.text} />
        </Box>
    );
};
