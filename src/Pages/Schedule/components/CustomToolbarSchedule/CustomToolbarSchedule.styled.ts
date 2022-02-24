import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #212121;
  height: auto;
  padding: 0 10px 10px 10px;
  button {
    margin: 5px 5px;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const StyledTitle = styled.h2`
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
`;
export const StyledButtonWrapper = styled.div`
  display: flex;
`;
