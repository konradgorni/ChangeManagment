import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  async function sendToBase(userId: string, isManager: boolean) {
    await supabase
      .from('users')
      .insert([
        {
          userId,
          isManager,
        },
      ])
      .single();
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const { error, user } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (user?.aud === 'authenticated') {
        sendToBase(user.id, false).then(() =>
          navigate('/login/createdAccount'),
        );
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <h1>Register</h1>
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
      <button type="button" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
