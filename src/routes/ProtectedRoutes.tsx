import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  redirect: string;
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<Props | any> = ({ redirect, children }) => {
  const token = JSON.parse(localStorage.getItem('user')!);

  if (!token) {
    return <Navigate to={redirect} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoutes;
