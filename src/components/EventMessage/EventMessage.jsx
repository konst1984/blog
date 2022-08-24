import React, { useEffect, useMemo } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { showMessage } from '../../store/articleSlice';
import classes from '../Pages/SingleArticle/SingleArticle.module.scss';

const EventMessage = ({ text, eventMessage, link }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timer = (delay) =>
    setTimeout(() => {
      dispatch(showMessage(false));
      navigate(link);
    }, delay);

  const style = useMemo(() => {
    return {
      padding: '15px',
      textAlign: 'center',
      fontSize: '24px',
      background: 'whitesmoke',
      borderRadius: '10px',
    };
  }, []);

  useEffect(() => {
    if (eventMessage) {
      timer(1000);
    }
    return () => {
      clearTimeout(timer());
    };
  }, []);

  return eventMessage ? (
    <div className={classes['empty-article']} style={style}>
      {text}
    </div>
  ) : null;
};

EventMessage.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  eventMessage: PropTypes.bool,
};
export default EventMessage;
