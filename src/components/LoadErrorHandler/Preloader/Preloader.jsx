import React from 'react';

import { useSelector } from 'react-redux';

import classes from '../../ArticleList/ArticleList.module.scss';

const Preloader = () => {
  const { status } = useSelector((state) => state.articles);
  return (
    status === 'loading' && (
      <div className={classes.preloader}>
        <img src="/images/preloader.gif" alt="preloader" />
      </div>
    )
  );
};

export default Preloader;
