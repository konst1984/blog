import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteArticle, showMessage } from '../../../../store/articleSlice';

import classes from './DeleteArticle.module.scss';

const DeleteArticle = ({ hiddenConfirm, visible, id }) => {
  const dispatch = useDispatch();
  return (
    <>
      {visible && (
        <div className={classes.wrapper}>
          <div className={classes.info}>
            <p className={classes['info__icon']}>
              <img src="/images/frame.svg" alt="Attention" />
            </p>
            <p>Are you sure to delete this article?</p>
          </div>
          <div className={classes['confirm-box']}>
            <button className={`${classes['confirm-answer']} ${classes['confirm-answer_no']}`} onClick={() => hiddenConfirm()}>
              No
            </button>
            <button
              className={`${classes['confirm-answer']} ${classes['confirm-answer_yes']}`}
              onClick={() => {
                dispatch(deleteArticle(id));
                dispatch(showMessage(true));
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

DeleteArticle.propTypes = {
  id: PropTypes.string,
  hiddenConfirm: PropTypes.func,
  visible: PropTypes.bool,
};

export default DeleteArticle;
