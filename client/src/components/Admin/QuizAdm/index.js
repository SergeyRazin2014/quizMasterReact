import React from 'react';
import QuizUpdateForm from 'src/components/Admin/QuizAdm/forms/QuizUpdateForm';

export const QuizAdm = (props) => {

    const handleSubmit = (values) => {
        alert(JSON.stringify(values));
    }

    return <QuizUpdateForm quizId={props.quizId} onSubmit={handleSubmit} />;
}
