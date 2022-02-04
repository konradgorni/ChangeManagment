import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '../../supabase/client';
import { sendDataToDataBase } from '../../utils/sendDataToDataBase';
import { StyledWrapper, StyledHeader } from './Register.styled';
import {
  StyledErrorMesage,
  StyledInput,
  StyledLabel,
} from '../Login/Login.styled';
import { StyledButton } from '../../styles/globalStylesComponents.styled';

const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required(),
    password: yup.string().required(),
    name: yup.string().required(),
    surname: yup.string().required(),
  })
  .required();

interface handleRegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleRegisterData>({
    resolver: yupResolver(schema),
  });

  const sendToBase = (
    userId: string,
    isManager: boolean,
    name: string,
    surname: string,
  ) => {
    sendDataToDataBase('users', {
      userId,
      isManager,
      Name: name,
      Surname: surname,
    }).then(() => {
      navigate('/login/createdAccount');
    });
  };

  const handleRegister = async (data: handleRegisterData) => {
    const { email, password, name, surname } = data;
    try {
      const { error, user } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (user?.aud === 'authenticated') {
        sendToBase(user.id, false, name, surname);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <StyledWrapper>
      <StyledHeader>Register</StyledHeader>
      <form onSubmit={handleSubmit(handleRegister)}>
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
          <StyledErrorMesage>{errors.password?.message}</StyledErrorMesage>
        </StyledLabel>
        <StyledLabel htmlFor="name">
          <h3>Name</h3>
          <StyledInput type="text" id="name" {...register('name')} />
        </StyledLabel>
        <StyledErrorMesage>{errors.name?.message}</StyledErrorMesage>
        <StyledLabel htmlFor="surname">
          <h3>Surname</h3>
          <StyledInput type="text" id="surname" {...register('surname')} />
        </StyledLabel>
        <StyledErrorMesage>{errors.surname?.message}</StyledErrorMesage>
        <StyledButton margin="20px auto 0 auto" type="submit">
          Submit
        </StyledButton>
      </form>
    </StyledWrapper>
  );
};

export default RegisterPage;
