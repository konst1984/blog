import React from 'react';

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

export default React.memo(LoadErrorComponent);
