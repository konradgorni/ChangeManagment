import styled from 'styled-components';

export const StyledNav = styled.nav`
  height: 5vh;
  width: 100%;
  background-color: #212121;
  ul {
    display: flex;
    li {
      padding: 10px 40px;
      a {
        color: white;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
`;
