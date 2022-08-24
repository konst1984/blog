import React from 'react';

import { Link } from 'react-router-dom';

import SignInOutBlock from '../SignInOutBlock/SignInOutBlock';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.title}>
        <Link to="articles">Realworld Blog</Link>
      </div>
      <SignInOutBlock />
    </div>
  );
};

export default Header;
