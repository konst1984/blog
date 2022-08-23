import React, { useEffect, useState } from 'react';

import { Alert } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import classes from './Error.module.scss';

const Error = ({ error, status }) => {
  const navigate = useNavigate();
  return (
    status === 'rejected' && (
      <>
        <button className={classes.return} onClick={() => navigate('/article')}>
          Go back to main page
        </button>
        <Alert message={error} type="error" className={classes.alert} />
      </>
    )
  );
};

Error.propTypes = {
  error: PropTypes.string,
  status: PropTypes.string,
};
export default Error;
