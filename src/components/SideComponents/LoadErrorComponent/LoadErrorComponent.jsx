import React from 'react';

import PropTypes from 'prop-types';

import Error from '../Error';
import Preloader from '../Preloader';

const LoadErrorComponent = ({ link, status, error }) => {
  return (
    <>
      <Preloader />
      <Error link={link} status={status} error={error} />
    </>
  );
};

LoadErrorComponent.propTypes = {
  error: PropTypes.string,
  status: PropTypes.string,
  link: PropTypes.string,
};

export default React.memo(LoadErrorComponent);
