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

const Edit = ({ children }) => {
  const { id } = useParams();
  const { fullArticle } = useSelector((state) => state.articles);
  const location = useLocation();
  if (!fullArticle) {
    return <Navigate to={`/articles/${id}`} state={{ from: location }} />;
  }
  return children;
};
export { Edit };

const ProfileAuth = ({ children }) => {
  const { login } = useSelector((state) => state.user);
  const location = useLocation();
  if (!login) {
    return <Navigate to={'/sign-in'} state={{ from: location }} />;
  }
  return children;
};
export { ProfileAuth };
