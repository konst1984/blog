import React, { useEffect, useState } from 'react';

import classes from './Input.module.scss';

const Input = (props) => {
  const { label, type, url, placeholder, reg, err, value, onChangeFunc } = props;
  // const [valueInp, setValue] = useState('');
  // useEffect(() => {
  //   setValue(value);
  // }, []);
  // console.log(err.password && err.password.ref.value);
  // console.log(err['password-repeat'] && err['password-repeat'].ref.value);
  return (
    <>
      <label>
        {label}
        <input
          className={classes.input}
          type={type}
          placeholder={placeholder}
          src={url}
          // value={value}
          {...reg}
          // onChange={(e) => onChangeFunc(e.target.value)}
        />
        {reg.name === 'username' && err?.username && (
          <span className={classes['input-message']}>{err?.username?.message}</span>
        )}
        {reg.name === 'password' && err?.password && (
          <span className={classes['input-message']}>{err?.password?.message || Error}</span>
        )}
        {reg.name === 'password-repeat' && err?.['password-repeat'] && (
          <span className={classes['input-message']}>{err?.['password-repeat']?.message}</span>
        )}
        {reg.name === 'email' && err?.email && (
          <span className={classes['input-message']}>
            {err?.email?.message || err?.email?.pattern.message}
          </span>
        )}
        {reg.name === 'image' && err?.image && (
          <span className={classes['input-message']}>{err?.image?.message}</span>
        )}
      </label>
    </>
  );
};

export default Input;
