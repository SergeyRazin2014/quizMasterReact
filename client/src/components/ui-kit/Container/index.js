import React from 'react';
import { Box } from '../Box';

export const Container = (props) => {
    return (
        <Box {...props} mt={10} ml={20} mr={20} >
            {props.children}
        </Box>
    );
};
