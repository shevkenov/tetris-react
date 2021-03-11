import styled from 'styled-components'

export default styled.div`
    box-sizing: border-box;
    background: #000;
    width: 100%;
    min-height: 50px;
    color: ${props => (props.gameOver ? 'red' : '#999')};
    margin: 0 0 20px 0;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #333;
    font-size: 1rem;
    font-family: Pixel, Arial, Helvetica, sans-serif;
`;