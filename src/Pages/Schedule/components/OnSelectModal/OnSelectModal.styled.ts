import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #212121;
  border-radius: 2px;
  border: 2px solid #fab700;
  padding: 2%;
  z-index: 50;
  h2 {
    color: white;
  }
`;
export const StyledButtonsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;
export const StyledInputTimeWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;
export const StyledCheckboxInput = styled.input`
  width: 15px;
  height: 15px;
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
  }
`;
