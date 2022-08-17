import React, { useEffect, useState } from 'react';
import classes from './DeletionConfirm.module.scss';
import { useDispatch } from 'react-redux';
import { deleteArticle } from '../../../../store/articleSlice';

const DeletionConfirm = ({ hiddenConfirm, visible, id, changeShow }) => {
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
            <button
              className={`${classes['confirm-answer']} ${classes['confirm-answer_no']}`}
              onClick={() => hiddenConfirm()}
            >
              No
            </button>
            <button
              className={`${classes['confirm-answer']} ${classes['confirm-answer_yes']}`}
              onClick={() => {
                dispatch(deleteArticle(id));
                changeShow(true);
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

export default DeletionConfirm;
