import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUser, setLogout } from '../../../store/userSlice';
import classes from '../Header.module.scss';

const LinkProfile = () => {
  const { image, username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className={classes.profile}>
      <div className={classes['profile__nickname']}>
        <Link to={'/profile'} onClick={() => dispatch(getUser(username))}>
          {username}
        </Link>
      </div>
      <div className={classes['profile__avatar']}>
        <img src={image} alt="Avatar" />
      </div>
    </div>
  );
};

const HeaderButton = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(setLogout());
    localStorage.removeItem('token');
  };
  return (
    <>
      <Link to="new-article" className={`${classes['create-btn']} ${classes.btn__green}`}>
        Create article
      </Link>
      <LinkProfile />
      <Link to="/articles" className={`${classes.sign} ${classes['sign_exit']}`} onClick={logOut}>
        Log out
      </Link>
    </>
  );
};

export default HeaderButton;
