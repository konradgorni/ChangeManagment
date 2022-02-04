import styled from 'styled-components';

export const StyledButton = styled.button<any>`
  background-color: ${({ background }) => background || '#fab700'};
  border-radius: 3px;
  color: white;
  font-weight: bold;
  border: none;
  display: block;
  width: 130px;
  font-size: 25px;
  height: 45px;
  cursor: pointer;
  margin: ${({ margin }) => margin};
`;
