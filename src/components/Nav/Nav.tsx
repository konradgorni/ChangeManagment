import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNav } from './Nav.styled';

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
            <Link to="/schedule">Schedule</Link>
          </li>
          {isManager && (
            <li>
              <Link to="/managerboard">ManagerBoard</Link>
            </li>
          )}
        </ul>
      )}
    </StyledNav>
  );
};
export default Nav;
