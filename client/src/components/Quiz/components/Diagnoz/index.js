import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export const Diagnoz = ({ diagnoz }) => {
    if (!diagnoz) {
        return null;
    }
    return (
        <div>
            <p>Результат:</p>
            {ReactHtmlParser(diagnoz.text)}
        </div>
    );
};