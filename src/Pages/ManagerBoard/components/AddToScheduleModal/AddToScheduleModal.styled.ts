import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background-color: #212121;
  border-radius: 5px;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: white;
    margin: 15px 0;
  }
  @media (min-width: 1024px) {
    height: auto;
    width: 60%;
  }
  @media (min-width: 1300px) {
    width: 50%;
  }
  @media (min-width: 1600px) {
    width: 40%;
  }
  @media (min-width: 1800px) {
    width: 35%;
  }
  @media (min-width: 2100px) {
    width: 30%;
  }
  @media (min-width: 2300px) {
    width: 25%;
  }
`;
export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;
export const StyledContainer = styled.div`
  width: 100%;
  padding: 2%;
  @media (min-width: 700px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 90%;
  }
`;
