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
  h2 {
    color: #fab700;
    margin-bottom: 20px;
  }
`;
export const StyledWorkerCard = styled.div`
  margin: 20px 0;
  color: white;
  p {
    margin: 2px 0;
  }
`;
export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
