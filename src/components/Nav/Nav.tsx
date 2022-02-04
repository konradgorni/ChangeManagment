import React from 'react';
import { StyledLink, StyledNav } from './Nav.styled';

interface NavProps {
  isLogged: boolean;
  isManager: boolean;
}

const Nav = ({ isLogged, isManager }: NavProps) => {
  return (
    <StyledNav>
      {isLogged && (
        <ul>
          <li>
            <StyledLink logo="true" to="/">
              CHM
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/schedule">Schedule</StyledLink>
          </li>
          {isManager && (
            <li>
              <StyledLink to="/managerboard">ManagerBoard</StyledLink>
            </li>
          )}
        </ul>
      )}
    </StyledNav>
  );
};
export default Nav;
