import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import DeleteArticleMessage from '../DeleteArticleMessage';
import classes from '../Pages/SingleArticle/SingleArticle.module.scss';

const DelEditButtons = ({ id, changeShow }) => {
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
            <DeleteArticleMessage
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

DelEditButtons.propTypes = {
  id: PropTypes.string,
  changeShow: PropTypes.func,
};

export default DelEditButtons;
