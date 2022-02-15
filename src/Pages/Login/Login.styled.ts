import styled from 'styled-components';

export const StyledHeader = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 62px;
`;
export const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #212121;
`;
export const StyledInfoRegister = styled.p`
  display: block;
  color: white;
  margin-top: 15px;
  font-size: 15px;
  button {
    border: none;
    background-color: transparent;
    color: #fab700;
    padding-left: 5px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 1px;
  }
`;
export const StyledAccountCreatedInfo = styled.h2`
  color: white;
  font-size: 35px;
  margin-bottom: 15px;
`;
