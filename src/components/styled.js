import styled from 'styled-components';

export const Title = styled.h1`
font-size: 24px;
color: white;
background-color: #1f77b4;
text-align: center;
`;

export const Subtitle = styled.h2`
font-size: 24px;
border: 1px solid blue;
text-transform: uppercase;
text-align: center;
`;

export const TopContainer = styled.div`
padding: 12px;
display: flex;
align-items: flex-start;
justify-content: center;
@media only screen and (max-width: 600px) {
  flex-direction: column;
}
`;

export const Button = styled.button`
  background:green;
  color: #fff;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
`;