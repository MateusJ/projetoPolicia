import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        display: flex;
        width: 33%;
        flex-direction: column;
    }
    text-align: center;
`;

export const StyledH3 = styled.h3`
    text-align: center;
    cursor: pointer;
    &:hover {
        color: #ff7f0e;
        text-decoration: underline;
    }
`;
