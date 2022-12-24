import React from 'react';
import styled from 'styled-components';

const Card = ({ icon, count, text }) => (
    <Container>
        {icon}
        <span>{text}</span>
        <CountSpan>{count}</CountSpan>
    </Container>
);

const Container = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid gray;
    padding: 10px;
    width: 100px;
    height: 100px;
    margin: 2px 0;
`;

const CountSpan = styled.span`
    font-size: 24px;
    font-weight: 600;
`;

export default Card;