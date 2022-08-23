import React, { useCallback, useState } from 'react';

import { Button } from 'antd';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { changeTag, delTag } from '../../../store/articleSlice';
import classes from '../ArticleLayout.module.scss';

const Tag = ({ id, text, regTags }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const changeValue = (e) => {
    setValue(e.target.value);
    dispatch(changeTag({ id, text: e.target.value }));
  };

  const ButtonDel = ({ id }) => {
    const dispatch = useDispatch();
    return (
      <Button danger onClick={() => dispatch(delTag(id))}>
        Delete
      </Button>
    );
  };
  const debounceFn = useCallback(debounce(changeValue, 500), [value]);
  return (
    <div id={id} className={classes.tag}>
      <label>
        <input
          className={classes.input}
          type="text"
          placeholder={'Tag'}
          defaultValue={text}
          required
          {...regTags(id)}
          onChange={debounceFn}
        />
      </label>
      <ButtonDel id={id} />
    </div>
  );
};

Tag.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  regTags: PropTypes.func,
};
export default React.memo(Tag);
