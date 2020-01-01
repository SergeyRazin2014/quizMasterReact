import React, { useCallback } from 'react';
import { Box } from 'src/components/ui-kit/Box';


export const useRenderField = () => {
    const useCases = useCallback((props) => {
        const { myComponent: Component, myVal, input, meta: { touched, error, warning } } = props;

        input.value = myVal;


        return (
            <Box>
                <Box>
                    <Component {...input} value={myVal} />
                </Box>
                {touched && ((error && <span style={{ color: 'red' }} >{error}</span>) || (warning && <span style={{ color: 'yellow' }} >{warning}</span>))}
            </Box>
        );
    }, []);

    return useCases;
};