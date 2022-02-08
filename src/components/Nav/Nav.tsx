import React from 'react';
import { StyledLink, StyledNav } from './Nav.styled';

interface NavProps {
  isLogged: boolean;
  isManager: boolean;
  isAdmin: boolean;
}

const Nav = ({ isLogged, isManager, isAdmin }: NavProps) => {
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
          {isAdmin && (
            <li>
              <StyledLink to="/settings">Settings</StyledLink>
            </li>
          )}
        </ul>
      )}
    </StyledNav>
  );
};
export default Nav;
