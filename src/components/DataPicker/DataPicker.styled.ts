import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledDateWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  &:first-child {
    margin-bottom: 10px;
  }
  input {
    width: 80%;
    height: 38px;
  }
`;
