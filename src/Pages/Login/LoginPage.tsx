import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../../supabase/client';
import { saveUser } from '../../store/slice/AuthSlice';
import { StyledHeader, StyledWrapper } from './Login.styled';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(email, password);
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) return;
      dispatch(saveUser(user));
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <StyledWrapper>
      <h1>Login</h1>
      Email:
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Password:
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="button" onClick={handleSubmit}>
        Log In
      </button>
    </StyledWrapper>
  );
};

export default LoginPage;
