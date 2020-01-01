import React, { useCallback, useState } from 'react';
import { Input } from 'antd';

export const NotEmptyInput = ({ value, name }) => {

    const errors = {};

    const validate = useCallback(() => {
        if (!value) {
            errors.isEmpty = true;
        }


    }, [value]);

    return (
        <>
            <Input
                onChange={() => alert('change')}
                onBlur={validate}
                defaultValue={value}
                name={name}
            />
            {errors.isEmpty && <p style={{ color: 'red' }} >Required</p>}
        </>
    );
};
