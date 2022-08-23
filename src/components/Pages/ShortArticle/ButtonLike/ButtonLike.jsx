import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLikeCounts } from '../../../../store/articleSlice';
import classes from '../ShortArticle.module.scss';

const ButtonLike = ({ favoritesCount, id }) => {
  const [like, setLike] = useState(0);
  const login = useSelector((state) => state.user.login);
  const [flag, setFlag] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLike(favoritesCount);
  }, []);

  const handleLike = () => {
    if (flag) {
      dispatch(fetchLikeCounts(id));
      setFlag(false);
      setLike(like + 1);
    } else {
      dispatch(fetchLikeCounts(id));
      setFlag(true);
      setLike(like - 1);
    }
  };

  return (
    <span className={classes.likes}>
      <button disabled={!login} onClick={handleLike}>
        <img src="/images/heart.svg" alt="Like" />
      </button>
      {like}
    </span>
  );
};

ButtonLike.propTypes = {
  favoritesCount: PropTypes.number,
  id: PropTypes.string,
};

export default ButtonLike;
