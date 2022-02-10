import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background-color: #212121;
  border-radius: 2px;
  position: absolute;
  top: 5.5%;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2%;
  color: white;
  h2 {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }
  button {
    margin-top: 20px;
  }
`;
export const StyledUsersInfoWrapper = styled.div`
  margin-top: 20px;
  h3 {
    color: #fab700;
  }
  p:nth-of-type(1) {
    margin: 10px 0;
  }
`;
