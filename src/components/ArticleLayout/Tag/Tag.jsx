import React, { useCallback, useState } from 'react';

import { Button } from 'antd';
import debounce from 'lodash.debounce';

import classes from '../ArticleLayout.module.scss';
import { useDispatch } from 'react-redux';
import { changeTag, delTag } from '../../../store/articleSlice';

const Tag = ({ id, text, deleteTag, regTags }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const changeValue = (e) => {
    setValue(e.target.value);
    dispatch(changeTag({ id, text: e.target.value }));
  };

  // const changeValue = (e) => {
  //   setValue(e.target.value);
  //   changeTag(e, e.target.value, id);
  // };
  const ButtonDel = ({ deleteTag, id }) => {
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
      <ButtonDel id={id} deleteTag={deleteTag} />
    </div>
  );
};

export default React.memo(Tag);
