import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface protectedProps {
  is: boolean;
  path: string;
}

const Protected = ({ is, path }: protectedProps) => {
  const auth = is;
  return auth ? <Outlet /> : <Navigate to={path} />;
};
export default Protected;
