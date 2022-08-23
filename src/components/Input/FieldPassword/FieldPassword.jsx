import React from 'react';

import Input from '../index';

const FieldPassword = ({ reg, err }) => {
  const register = reg('password', {
    required: 'Your password needs to be at least 6 characters.',
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters.',
    },
    maxLength: {
      value: 40,
      message: 'Your password must not contain more than 40 characters',
    },
  });
  return <Input label={'Password'} type={'password'} placeholder={'Password'} reg={register} err={err} />;
};

export default FieldPassword;
