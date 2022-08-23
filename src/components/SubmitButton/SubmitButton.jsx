import React, { memo } from 'react';

import 'antd/dist/antd.css';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import Error from '../SideComponents/Error';

import classes from './SubmitButton.module.scss';

const SubmitButton = memo(({ name }) => {
  return (
    <Button type="primary" htmlType="submit" className={classes.button}>
      {name}
    </Button>
  );
});

Error.propTypes = {
  name: PropTypes.string,
};
export default SubmitButton;
