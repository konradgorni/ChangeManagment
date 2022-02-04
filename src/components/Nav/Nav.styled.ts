import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledNav = styled.nav`
  height: 5vh;
  width: 100%;
  background-color: #212121;
  ul {
    display: flex;
    align-items: center;
    height: 100%;
    li {
      list-style-type: none;
    }
  }
`;

export const StyledLink = styled(Link)<any>`
  color: ${(props) => (props.logo ? 'white' : '#fab700')};
  text-decoration: none;
  cursor: pointer;
  display: block;
  padding: 10px 40px;
  font-size: ${(props) => (props.logo ? '24px' : '18px')};
  letter-spacing: 2px;
`;
