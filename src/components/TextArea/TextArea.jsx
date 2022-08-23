import React from 'react';

import PropTypes from 'prop-types';

import Error from '../SideComponents/Error';

import classes from './TextArea.module.scss';

const TextArea = ({ label, value }) => {
  return (
    <label>
      {label}
      <textarea className={classes.textarea} name={'textarea'} placeholder={label} value={value} />
    </label>
  );
};

Error.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
export default TextArea;
