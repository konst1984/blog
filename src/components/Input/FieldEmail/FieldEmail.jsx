import React from 'react';
import Input from '../index';

const FieldEmail = ({ reg, err }) => {
  const register = reg('email', {
    required: 'Required field',
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Incorrect email',
    },
  });

  return <Input label={'Username'} placeholder={'Username'} reg={register} err={err} />;
};

export default FieldEmail;
