import React from 'react';
import { Button } from 'antd';

export const AddQuestion = ({ quiz }) => {

    const handleClick = () => {
        alert('add queston');
    };

    return (
        <Button type="primary" shape="circle-outline" icon="plus" onClick={handleClick} />
    );
};
