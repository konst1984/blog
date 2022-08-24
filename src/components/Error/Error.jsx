import React from 'react';

import { Alert } from 'antd';
import PropTypes from 'prop-types';

import classes from './Error.module.scss';

const Error = ({ error, status }) => {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    status === 'rejected' && (
      <>
        <button
          className={classes.return}
          onClick={() => {
            refreshPage();
          }}
        >
          Go back to page
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
