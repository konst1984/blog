import React from 'react';

import { Link } from 'react-router-dom';

import classes from './Header.module.scss';
import SignInOut from './SignInOut/SignInOut';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.title}>
        <Link to="articles">Realworld Blog</Link>
      </div>
      <SignInOut />
    </div>
  );
};

export default Header;
