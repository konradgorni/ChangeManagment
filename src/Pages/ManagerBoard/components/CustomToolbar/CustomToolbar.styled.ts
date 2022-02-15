import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  background-color: #212121;
  height: auto;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2%;
  button {
    margin: 0 5px;
  }
`;
export const StyledTitle = styled.h2`
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  margin-right: auto;
`;
export const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0;
  button {
    margin: 5px 5px;
  }
`;
