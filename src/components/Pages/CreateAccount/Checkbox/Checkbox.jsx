import React from 'react';

import clazz from '../CreateAccount.module.scss';

const Checkbox = ({ reg, err }) => {
  return (
    <label className={clazz['checkbox-label']}>
      <input className={clazz.checkbox} type="checkbox" value="" {...reg} />
      <span className={clazz['checkbox-inner']} />
      {err.checkbox ? (
        <span style={{ color: 'red' }}>{err?.checkbox?.message}</span>
      ) : (
        <span>I agree to the processing of my personal information</span>
      )}
    </label>
  );
};

export default Checkbox;
