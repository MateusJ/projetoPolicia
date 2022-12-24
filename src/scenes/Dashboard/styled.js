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