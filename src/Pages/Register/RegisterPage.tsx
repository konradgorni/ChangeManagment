import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { sendDataToDataBase } from '../../utils/sendDataToDataBase';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const navigate = useNavigate();
  const sendToBase = (userId: string, isManager: boolean) => {
    sendDataToDataBase('users', {
      userId,
      isManager,
      Name: name,
      Surname: surname,
    }).then(() => {
      navigate('/login/createdAccount');
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const { error, user } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (user?.aud === 'authenticated') {
        sendToBase(user.id, false);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  // TODO dodanie imienia i nazwiska do wysylki
  return (
    <div>
      <h1>Register</h1>
      Email:
      <br />
      <input
        type="text"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Password:
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={surname}
        placeholder="surname"
        onChange={(e) => setSurname(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
