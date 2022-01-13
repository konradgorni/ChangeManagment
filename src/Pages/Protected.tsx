import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface protectedProps {
  is: boolean;
}

const Protected = ({ is }: protectedProps) => {
  const auth = is;
  return auth ? <Outlet /> : <Navigate to="/" />;
};
export default Protected;
