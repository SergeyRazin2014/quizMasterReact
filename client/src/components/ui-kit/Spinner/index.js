import React from 'react';
import { Spin } from 'antd';
import { Box } from '../Box';


export const Spinner = ({ isVisible = true }) => {

    if (!isVisible) {
        return null;
    }

    return (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', minHeight: '100vh' }}>
            <Spin size="large" />
        </Box>
    );
};
