import React, { memo, useCallback, useEffect, useState } from 'react';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import DeleteArticle from '../DeleteArticle';
import classes from '../SingleArticle.module.scss';

const ActionButtons = ({ id, changeShow }) => {
  const { login } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      setVisible(false);
    }
  }, []);

  const hiddenConfirm = () => {
    setVisible(false);
  };
  const showConfirm = () => {
    setVisible(true);
  };
  return (
    <>
      {login && (
        <div className={classes.buttons}>
          <div className={classes['buttons__wrapper']}>
            <Button danger className={classes['del-article']} onClick={() => showConfirm()}>
              Delete
            </Button>
            <Link to={`/articles/${id}/edit`} className={classes['edit-article']}>
              Edit
            </Link>
            <DeleteArticle
              visible={visible}
              hiddenConfirm={hiddenConfirm}
              id={id}
              changeShow={changeShow}
            />
          </div>
        </div>
      )}
    </>
  );
};

ActionButtons.propTypes = {
  id: PropTypes.string,
  changeShow: PropTypes.func,
};

export default ActionButtons;
