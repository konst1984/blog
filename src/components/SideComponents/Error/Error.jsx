import React, { useEffect, useState } from 'react';

import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './Error.module.scss';

const Error = ({ link, error, status }) => {
  // const { status, error } = useSelector((state) => state.articles);
  // const navigate = useNavigate();
  // const timer = () => setTimeout(() => navigate(link), 3000);
  //
  // useEffect(() => {
  //   if (status === 'rejected') {
  //     timer();
  //   }
  //   return () => clearTimeout(timer());
  // }, [status]);

  return (
    status === 'rejected' && (
      <>
        <button>Return back</button>
        <Alert message={error} type="error" className={classes.alert} />
      </>
    )
  );
};

export default Error;
