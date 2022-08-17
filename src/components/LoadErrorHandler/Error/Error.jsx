import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import classes from './Error.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const { status, error } = useSelector((state) => state.articles);
  const navigate = useNavigate();
  const timer = (delay) =>
    setTimeout(() => {
      setTimeout(() => navigate('/article'), delay);
    }, delay);

  useEffect(() => {
    if (status === 'rejected') {
      timer(2000);
    }
    return () => clearTimeout(timer());
  }, [status]);

  return (
    status === 'rejected' && (
      <Alert message={error} type="error" showIcon className={classes.alert} />
    )
  );
};

export default Error;
