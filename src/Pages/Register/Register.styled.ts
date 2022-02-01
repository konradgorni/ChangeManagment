import styled from 'styled-components';

export const StyledHeader = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 62px;
`;
// TODO DON'T DUPLICATE STYLE FOR LOGIN AND REGISTER STYLED
export const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #212121;
`;
export const StyledLabel = styled.label`
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
export const StyledButton = styled.button`
  background-color: #fab700;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  border: none;
  display: block;
  margin: 20px auto 0 auto;
  width: 130px;
  font-size: 25px;
  height: 45px;
  cursor: pointer;
`;
