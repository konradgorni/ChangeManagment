import React, { useState } from 'react';
import {
  HamburgerIconStyled,
  StyledHamburgerWrapper,
  StyledLink,
  StyledList,
  StyledLogo,
  StyledLogoWrapper,
  StyledNav,
} from './Nav.styled';

interface NavProps {
  isLogged: boolean;
  isManager: boolean;
  isAdmin: boolean;
}

const Nav = ({ isLogged, isManager, isAdmin }: NavProps) => {
  const [show, setShow] = useState(false);
  return (
    <StyledNav>
      <StyledHamburgerWrapper type="submit" onClick={() => setShow(!show)}>
        <HamburgerIconStyled />
      </StyledHamburgerWrapper>
      {isLogged && (
        <StyledList show={show}>
          <StyledLogoWrapper>
            <StyledLogo logo="true" to="/">
              CHM
            </StyledLogo>
          </StyledLogoWrapper>
          <li>
            <StyledLink onClick={() => setShow(false)} to="/schedule">
              Schedule
            </StyledLink>
          </li>
          {isManager && (
            <li>
              <StyledLink onClick={() => setShow(false)} to="/managerboard">
                ManagerBoard
              </StyledLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <StyledLink onClick={() => setShow(false)} to="/settings">
                Settings
              </StyledLink>
            </li>
          )}
        </StyledList>
      )}
    </StyledNav>
  );
};
export default Nav;
