import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${bgImage});
    background-size: cover;
    overflow: hidden;
`;

export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 0 auto;
    max-width: 900px;
    padding: 40px;
    
    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`;