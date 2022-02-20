import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  color: white;
  padding: 15px 0;
  border-radius: 5px;

  background-color: #212121;
  h2 {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    @media (min-width: 1024px) {
      font-size: 35px;
    }
  }
  @media (min-width: 900px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50vh;
    width: 50vh;
  }
  @media (min-width: 1024px) {
    height: auto;
  }
`;
export const StyledUsersInfoWrapper = styled.div`
  margin: 25px 0;
  width: 100%;
  text-align: center;
  h3 {
    color: #fab700;
    font-size: 22px;
    margin-top: 20px;
    @media (min-width: 1024px) {
      font-size: 25px;
    }
  }
  p:nth-of-type(1) {
    margin: 20px 0;
    font-size: 16px;
    @media (min-width: 1024px) {
      font-size: 18px;
    }
  }
`;
