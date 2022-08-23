import React from 'react';

import PropTypes from 'prop-types';

import Input from '../index';

const FieldEmail = ({ reg, err }) => {
  const register = reg('email', {
    required: 'Required field',
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Incorrect email',
    },
  });

  return <Input label={'Email address'} placeholder={'Email address'} reg={register} err={err} />;
};

FieldEmail.propTypes = {
  err: PropTypes.object,
  reg: PropTypes.func,
};

export default FieldEmail;
