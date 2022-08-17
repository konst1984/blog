import React, { memo } from 'react';

import classes from './LastRowForm.module.scss';
import { Link } from 'react-router-dom';

const LastRowForm = memo(({ text, link, nameLink }) => {
  return (
    <div className={classes.question}>
      <span>{text}</span>
      <Link to={`/${link}`}>{nameLink}</Link>
    </div>
  );
});

export default LastRowForm;
