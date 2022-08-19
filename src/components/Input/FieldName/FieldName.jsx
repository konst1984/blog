import React from 'react';

import Input from '../index';

const FieldName = ({ reg, errors }) => {
  const register = reg('username', {
    required: 'Required field',
    minLength: {
      value: 3,
      message: 'Username must be between 3 and 20 characters (inclusive)',
    },
    maxLength: {
      value: 20,
      message: 'Username must be between 3 and 20 characters (inclusive)',
    },
  });

  return <Input label={'Username'} placeholder={'Username'} reg={register} err={errors} />;
};

export default FieldName;
