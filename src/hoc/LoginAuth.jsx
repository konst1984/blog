import React from 'react';

import { useSelector } from 'react-redux';
import { useLocation, Navigate, useParams } from 'react-router-dom';

const LoginAuth = ({ children }) => {
  const { login } = useSelector((state) => state.user);
  const location = useLocation();
  if (login) {
    return <Navigate to={'/article'} state={{ from: location }} />;
  }
  return children;
};
export { LoginAuth };

const ProfileAuth = ({ children }) => {
  const { login } = useSelector((state) => state.user);
  const location = useLocation();
  if (!login) {
    return <Navigate to={'/sign-in'} state={{ from: location }} />;
  }
  return children;
};
export { ProfileAuth };
