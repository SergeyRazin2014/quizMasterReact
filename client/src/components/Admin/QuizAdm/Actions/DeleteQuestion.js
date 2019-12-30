import React from 'react';
import { Button } from 'antd';

export const DeleteQuestion = ({ question }) => {

    const handleDelete = () => {
        alert(`вопрос с id ${question._id} будет удален...`);
    };

    return (
        <Button icon="delete" shape="circle" type="danger" onClick={handleDelete} />
    );
};
