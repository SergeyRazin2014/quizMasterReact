import React from 'react';

export const Diagnoz = ({ diagnoz }) => {
    if (!diagnoz) {
        return null;
    }
    return (
        <div>
            <p>Результат:</p>
            {diagnoz.text}
        </div>
    );
};