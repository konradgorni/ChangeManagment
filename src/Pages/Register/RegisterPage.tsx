import React, { useState } from 'react';
import { supabase } from '../../supabase/client';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log('KONTO ZAREJESTROWANO');
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
