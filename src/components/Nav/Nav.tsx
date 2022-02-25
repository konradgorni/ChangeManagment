import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  HamburgerIconStyled,
  StyledHamburgerWrapper,
  StyledLink,
  StyledList,
  StyledNav,
  XIconStyled,
} from './Nav.styled';
import {
  saveUser,
  updateAdmin,
  updateManager,
} from '../../store/slice/AuthSlice';

interface NavProps {
  isLogged: boolean;
  isManager: boolean;
  isAdmin: boolean;
}

const Nav = ({ isLogged, isManager, isAdmin }: NavProps) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(updateManager(false));
    dispatch(updateAdmin(false));
    dispatch(saveUser(null));
  };

  return (
    <StyledNav>
      <StyledHamburgerWrapper type="submit" onClick={() => setShow(!show)}>
        {show ? <XIconStyled /> : <HamburgerIconStyled />}
      </StyledHamburgerWrapper>
      {isLogged && (
        <StyledList show={show}>
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
          <li>
            <StyledLink onClick={handleLogOut} to="/login">
              LogOut
            </StyledLink>
          </li>
        </StyledList>
      )}
    </StyledNav>
  );
};
export default Nav;
