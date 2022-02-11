import styled from 'styled-components';
import Select from 'react-select';

interface StyledButtonProps {
  margin?: string;
  background?: string;
  padding?: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ background }) => background || '#fab700'};
  border-radius: 3px;
  color: white;
  font-weight: bold;
  border: none;
  padding: ${({ padding }) => padding || '0'};
  display: block;
  min-width: 130px;
  width: auto;
  font-size: 25px;
  height: 45px;
  cursor: pointer;
  margin: ${({ margin }) => margin};
`;
export const StyledLabel = styled.label<{ flexDirection?: string }>`
  display: flex;
  flex-direction: column;
  color: #fab700;
  font-weight: 600;
  h3 {
    padding: 10px 0;
  }
`;
export const StyledInput = styled.input`
  background-color: #212121;
  border: 3px solid white;
  display: block;
  border-radius: 2px;
  padding: 10px;
  height: 45px;
  width: 300px;
  color: white;
  outline: none;
  &:focus {
    border: 3px solid white;
  }
`;
export const StyledErrorMesage = styled.p`
  color: red;
  margin: 5px 0;
`;
export const StyledSelect = styled(Select)`
  width: 300px;
  height: 45px; !important;
`;
