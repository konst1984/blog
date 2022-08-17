import React from 'react';

import Error from './Error';
import Preloader from './Preloader';

const LoadErrorHandler = () => {
  return (
    <>
      <Preloader />
      <Error />
    </>
  );
};

export default React.memo(LoadErrorHandler);
