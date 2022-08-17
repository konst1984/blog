import React, { useEffect, useState } from 'react';

import { Button } from 'antd';

import classes from '../ArticleLayout.module.scss';
import Tag from '../Tag';

const TagsBlock = ({ tagsArr, addTag, changeTag, deleteTag, regTags }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(tagsArr);
  }, [tagsArr]);

  const tagsList =
    tags &&
    tags.map((tag) => (
      <Tag
        key={tag.id}
        id={tag.id}
        text={tag.text}
        changeTag={changeTag}
        deleteTag={deleteTag}
        regTags={regTags}
      />
    ));

  const ButtonAdd = ({ addTag, style }) => {
    return (
      <Button type="primary" ghost onClick={() => addTag()} style={style}>
        Add tag
      </Button>
    );
  };

  return (
    <div className={classes.tags}>
      {tags && tagsList.length ? (
        <>
          <p className={classes['tags-label']}>Tag</p>
          {tagsList}
          <ButtonAdd addTag={addTag} />
        </>
      ) : (
        <ButtonAdd addTag={addTag} style={{ bottom: '-15px', left: '0' }} />
      )}
    </div>
  );
};

export default React.memo(TagsBlock);
