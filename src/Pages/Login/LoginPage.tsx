import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { saveUser, updateManager } from '../../store/slice/AuthSlice';
import { StyledHeader, StyledWrapper } from './Login.styled';
import { fetchDataFromDataBase } from '../../utils/fetchDataFromDataBase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [created, isCreated] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createdAccount } = useParams();
  useEffect(() => {
    if (createdAccount === 'createdAccount') {
      isCreated(true);
    }
  }, [createdAccount]);

  async function fetchDataUser(userId: string | undefined) {
    fetchDataFromDataBase('users', 'isManager', {
      columnTitle: 'userId',
      columnValue: userId,
    }).then(({ data }) => {
      if (data !== null) {
        dispatch(updateManager(data[0].isManager));
      }
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) return;
      dispatch(saveUser(user));
      fetchDataUser(user?.id);
      navigate('/start');
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <StyledWrapper>
      {created && <h1>Konto zostało stworzone,możesz się zalogować</h1>}
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
