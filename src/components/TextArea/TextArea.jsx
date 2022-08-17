import React from 'react';

import classes from './TextArea.module.scss';

const TextArea = ({ label, value }) => {
  return (
    <label>
      {label}
      <textarea className={classes.textarea} name={'textarea'} placeholder={label} value={value} />
    </label>
  );
};

export default TextArea;
