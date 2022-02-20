import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: absolute;
  width: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #212121;
  border-radius: 2px;
  z-index: 50;
  padding: 2%;
  @media (min-width: 1024px) {
    padding: 1%;
  }
  h2 {
    color: white;
    font-size: 30px;
    @media (min-width: 1300px) {
      font-size: 35px;
    }
    @media (min-width: 1600px) {
      font-size: 40px;
    }
  }
`;
export const StyledButtonsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;
export const StyledInputTimeWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  input {
    height: 25px;
    @media (min-width: 1300px) {
      height: 35px;
    }
  }
`;
export const StyledCheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  @media (min-width: 1300px) {
    width: 25px;
    height: 25px;
  }
`;
export const StyledH2 = styled.h2`
  color: white;
`;
export const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fab700;
  font-weight: 600;
  cursor: pointer;
  h3 {
    margin: 10px 10px 10px 0;
    font-size: 28px;
    @media (min-width: 1300px) {
      font-size: 30px;
    }
    @media (min-width: 1600px) {
      font-size: 35px;
    }
  }
`;
