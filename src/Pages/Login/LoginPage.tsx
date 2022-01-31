import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../../supabase/client';
import { saveUser, updateManager } from '../../store/slice/AuthSlice';
import {
  StyledAccountCreatedInfo,
  StyledButton,
  StyledErrorMesage,
  StyledHeader,
  StyledInfoRegister,
  StyledInput,
  StyledLabel,
  StyledWrapper,
} from './Login.styled';
import { fetchDataFromDataBase } from '../../utils/fetchDataFromDataBase';

const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required(),
    password: yup.string().required(),
  })
  .required();
const LoginPage = () => {
  const [created, isCreated] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createdAccount } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      isCreated(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [created]);

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
  interface handleLogInData {
    email: string;
    password: string;
  }
  const handleLogIn = async (data: any) => {
    const { email, password } = data;
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) return;
      dispatch(saveUser(user));
      fetchDataUser(user?.id);
      navigate('/start');
    } catch (error) {
      alert(error.message);
    }
  };
  // TODO zmiana created po uplywie 5 sekund dodac.
  return (
    <StyledWrapper>
      {created && (
        <StyledAccountCreatedInfo>
          Account has been created
        </StyledAccountCreatedInfo>
      )}
      <StyledHeader>Login</StyledHeader>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <StyledLabel htmlFor="email">
          <h3>Email</h3>
          <StyledInput type="email" id="test" {...register('email')} />
        </StyledLabel>
        <StyledErrorMesage>{errors.email?.message}</StyledErrorMesage>

        <StyledLabel htmlFor="password">
          <h3>Password</h3>
          <StyledInput
            type="password"
            id="password"
            {...register('password')}
          />
        </StyledLabel>
        <StyledErrorMesage>{errors.password?.message}</StyledErrorMesage>

        <StyledButton type="submit">Log In</StyledButton>
      </form>
      <StyledInfoRegister>
        If you do not have account
        <button onClick={() => navigate('/register')} type="submit">
          Click here
        </button>
      </StyledInfoRegister>
    </StyledWrapper>
  );
};

export default LoginPage;
