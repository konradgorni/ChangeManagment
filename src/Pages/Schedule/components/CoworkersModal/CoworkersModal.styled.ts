import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
  overflow: scroll;
  background-color: #212121;
  border-radius: 2px;
  padding: 2%;
  z-index: 9;
  @media (min-width: 1300px) {
    padding: 1%;
  }
  h2 {
    color: #fab700;
    margin-bottom: 20px;
    font-size: 25px;
    text-align: center;
    @media (min-width: 1024px) {
      font-size: 30px;
    }
  }
  h3 {
    font-size: 20px;
    @media (min-width: 1024px) {
      font-size: 25px;
    }
  }
  @media (min-width: 700px) {
    width: 50vh;
  }
  @media (min-width: 1300px) {
    width: 45vh;
  }
`;
export const StyledWorkerCard = styled.div<{ user?: boolean }>`
  margin: 20px 0;
  color: ${({ user }) => (user ? '#fab700' : 'white')};
  p {
    margin: 2px 0;
    font-size: 18px;
    @media (min-width: 1024px) {
      font-size: 22px;
    }
  }
`;
export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
