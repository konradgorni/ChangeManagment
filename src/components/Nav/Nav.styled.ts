import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as HamburgerIcon } from './hamburger.svg';
import { ReactComponent as XIcon } from './x.svg';

export const StyledNav = styled.nav`
  min-height: 5vh;
  background-color: #212121;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
export const StyledHamburgerWrapper = styled.button`
  border: none;
  background-color: transparent;
  align-self: flex-end;
  margin: 0;
  @media (min-width: 1024px) {
    display: none;
  }
`;
export const HamburgerIconStyled = styled(HamburgerIcon)`
  width: 40px;
  height: 40px;
  color: white;
`;
export const XIconStyled = styled(XIcon)`
  width: 40px;
  height: 40px;
  color: white;
`;

export const StyledList = styled.ul<{ show: boolean }>`
  top: 5vh;
  z-index: 10;
  height: 95vh;
  width: 100%;
  position: absolute;
  left: ${({ show }) => (show ? '0' : '-100%')};
  color: white;
  background-color: #212121;
  transition: 0.3s ease-in-out;
  list-style: none;
  li {
    text-align: center;
    padding: 10px 10px;
  }
  @media (min-width: 1024px) {
    top: 0;
    left: 0;
    height: 5vh;
    display: flex;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 45px;
  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;
