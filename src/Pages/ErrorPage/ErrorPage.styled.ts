import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background-color: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  h1 {
    font-size: 35px;
    margin-bottom: 20px;
    text-transform: uppercase;
    color: white;
    text-align: center;
    @media (min-width: 1024px) {
      font-size: 45px;
    }
  }
`;
