import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { addNewTag } from '../../../store/articleSlice';
import { tagsCreator } from '../../../utilites/helpers';
import classes from '../ArticleLayout.module.scss';
import Tag from '../Tag';

const TagsBlock = ({ regTags }) => {
  const { tags } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const [tagsArr, setTagArr] = useState();

  const handleAddTag = () => {
    const newTag = tagsCreator('');
    dispatch(addNewTag(newTag));
  };

  useEffect(() => {
    setTagArr(tags);
  }, [tags]);

  const tagsList =
    tagsArr &&
    tagsArr.map((tag) => <Tag key={tag.id} id={tag.id} text={tag.text} regTags={regTags} />);

  const ButtonAdd = ({ addTag, style }) => {
    return (
      <Button type="primary" ghost onClick={handleAddTag} style={style}>
        Add tag
      </Button>
    );
  };

  return (
    <div className={classes.tags}>
      {tagsList && tagsList.length ? (
        <>
          <p className={classes['tags-label']}>Tag</p>
          {tagsList}
          <ButtonAdd />
        </>
      ) : (
        <ButtonAdd style={{ bottom: '-15px', left: '0' }} />
      )}
    </div>
  );
};

TagsBlock.propTypes = {
  regTags: PropTypes.func,
};

export default TagsBlock;
