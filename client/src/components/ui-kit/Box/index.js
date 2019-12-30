import React from 'react';
import styled from 'styled-components';
import { space, width, fontSize, color } from 'styled-system';

const BoxStyled = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`;

export const Box = (props) => {
    return (
        <BoxStyled {...props}>
            {props.children}
        </BoxStyled>
    );
};
