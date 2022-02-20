import styled from 'styled-components';

// export const StyledWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   background-color: #212121;
//   height: 5vh;
//   align-items: center;
//   justify-content: flex-end;
//   padding: 0 2%;
//   button {
//     margin: 0 5px;
//   }
// `;
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
