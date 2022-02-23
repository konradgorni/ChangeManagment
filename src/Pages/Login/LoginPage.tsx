import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import { supabase } from '../../supabase/client';
import {
  saveUser,
  updateAdmin,
  updateManager,
} from '../../store/slice/AuthSlice';
import {
  StyledAccountCreatedInfo,
  StyledHeader,
  StyledInfoRegister,
  StyledWrapper,
} from './Login.styled';
import { fetchDataFromDataBase } from '../../utils/fetchDataFromDataBase';
import {
  StyledButton,
  StyledLabel,
  StyledInput,
  StyledErrorMesage,
} from '../../styles/globalStylesComponents.styled';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../utils/notificationsHandler';
import { handleLogInData } from './utils/typesLoginPage';
import { schema } from './utils/FormSchema';

const LoginPage = () => {
  const [created, isCreated] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createdAccount } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<handleLogInData>({
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

  const fetchDataUser = (userId: string | undefined) => {
    fetchDataFromDataBase('users', 'isManager,isAdmin', {
      columnTitle: 'userId',
      columnValue: userId,
    }).then(({ data, error }) => {
      if (data !== null) {
        dispatch(updateManager(data[0].isManager));
        dispatch(updateAdmin(data[0].isAdmin));
        navigate('/schedule');
      }
      if (error) {
        notyficationsHandler(
          'Problem with fetching user data',
          NotyficationsStatusEnum.ERROR,
        );
        navigate('/login');
      }
    });
  };

  const handleLogIn = async (data: handleLogInData) => {
    const { email, password } = data;
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      if (error.status === 400) {
        notyficationsHandler(
          'Invalid email or password',
          NotyficationsStatusEnum.ERROR,
        );
      } else {
        notyficationsHandler(
          'Something went wrong',
          NotyficationsStatusEnum.ERROR,
        );
      }
      reset({ email: '', password: '' });
    } else {
      dispatch(saveUser(user));
      fetchDataUser(user?.id);
    }
  };
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

        <StyledButton margin="20px auto 0 auto" type="submit">
          Log In
        </StyledButton>
      </form>
      <StyledInfoRegister>
        If you do not have account
        <button onClick={() => navigate('/register')} type="submit">
          Click here
        </button>
      </StyledInfoRegister>
      <ToastContainer />
    </StyledWrapper>
  );
};

export default LoginPage;
