import React, { useEffect, useState } from 'react';
import classes from '../SingleArticle.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MessageAboutDeleting = ({ show, changeShow }) => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.articles);
  const timer = (delay) =>
    setTimeout(() => {
      changeShow(false);
      navigate('/article');
    }, delay);

  useEffect(() => {
    if (show) {
      timer(300);
    }
    return () => clearTimeout(timer());
  }, []);

  return show ? <div className={classes['empty-article']}>Article deleted &#9760;</div> : null;
};

export default MessageAboutDeleting;
