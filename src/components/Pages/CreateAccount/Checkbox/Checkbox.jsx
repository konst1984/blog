import React from 'react';

import PropTypes from 'prop-types';

import clazz from '../CreateAccount.module.scss';

const Checkbox = ({ reg, err }) => {
  return (
    <label className={clazz['checkbox-label']}>
      <input className={clazz.checkbox} type="checkbox" value="" {...reg} />
      <span className={clazz['checkbox-inner']} />
      {err.checkbox ? <span style={{ color: 'red' }}>{err?.checkbox?.message}</span> : <span>I agree to the processing of my personal information</span>}
    </label>
  );
};

Checkbox.propTypes = {
  err: PropTypes.object,
  reg: PropTypes.object,
};

export default Checkbox;
