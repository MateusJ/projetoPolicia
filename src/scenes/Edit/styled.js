import styled from "styled-components";

export const InputContainer = styled.div`
    justify-content: center;
    display: flex;
    margin: 12px;
    label {
    padding: 24px;
    margin-bottom: 12px;
    font-weight: bold;
    font-size: 22px;
    cursor: pointer;
    color: green;
    width: 200px;
    text-align: center;
    border: 1px solid green;
    }
    input {
    opacity: 0;
    position: absolute;
    z-index: -1;
    }
`;

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
`;
export const Label = styled.div`

    text-align: left;
    display:block;
`;
export const Input = styled.input`
    width: 100%;
    padding: 6px 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    box-sizing: border-box;
    display: block;

`;
export const Select = styled.select`
width: 100%;
padding: 6px 10px;
margin: 10px 0;
border: 1px solid #ddd;
box-sizing: border-box;
display: block;

`;


export const StyledH3 = styled.h3`
    text-align: center;
    cursor: pointer;
    &:hover {
        color: #ff7f0e;
        text-decoration: underline;
    }
`;