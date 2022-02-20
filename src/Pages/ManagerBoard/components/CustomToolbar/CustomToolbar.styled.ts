import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  background-color: #212121;
  height: auto;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
  @media (min-width: 1024px) {
    padding: 10px 10px 0 10px;
  }
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
  text-align: center;
  @media (min-width: 1024px) {
    text-align: left;
  }
`;
export const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 5px 5px;
  }
`;
export const StyledButtonsContainer = styled.div`
  display: flex;
  margin: 10px 0;
  flex-direction: column;
  @media (min-width: 550px) {
    flex-direction: row;
  }
`;
