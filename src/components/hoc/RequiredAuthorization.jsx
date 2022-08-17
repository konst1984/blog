import React from 'react';

import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const RequiredAuthorization = ({ children }) => {
  const { login } = useSelector((state) => state.user);
  const location = useLocation();

  if (!login) {
    return <Navigate to={'/sign-in'} state={{ from: location }} />;
  }
  return children;
};
export { RequiredAuthorization };
