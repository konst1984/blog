import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from '../Header/Header.module.scss';
import { HeaderButton } from '../HeaderButton';

const SignInOutBlock = () => {
  const login = useSelector((state) => state.user.login);
  return (
    <div className={classes.buttons}>
      {login ? (
        <HeaderButton />
      ) : (
        <>
          <Link to="/sign-in" className={classes.sign}>
            sign in
          </Link>
          <Link to="/sign-up" className={`${classes.sign} ${classes.btn__green}`}>
            sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default SignInOutBlock;
