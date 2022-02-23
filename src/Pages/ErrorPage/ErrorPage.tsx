import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledWrapper } from './ErrorPage.styled';
import { StyledButton } from '../../styles/globalStylesComponents.styled';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <h1>something goes wrong</h1>
      <StyledButton
        onClick={() => navigate('/login')}
        padding="0 10px"
        type="submit"
      >
        Back to Login Page
      </StyledButton>
    </StyledWrapper>
  );
};
export default ErrorPage;
