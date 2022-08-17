import React from 'react';

import { tagsArray } from '../../utilites/helpers';
import SubmitButton from '../SubmitButton';

import classes from './ArticleLayout.module.scss';
import TagsBlock from './TagsBlock';
import { useDispatch, useSelector } from 'react-redux';

const ArticleLayout = ({
  tagsArr,
  titleForm,
  regTitle,
  regDescribe,
  regText,
  submit,
  regTags,
  tags,
  setTags,
}) => {
  // const tags = useSelector((state) => state.articles.tags);
  // const dispatch = useDispatch();
  //
  const addTag = () => {
    const newTag = tagsArray('');
    setTags([...tags, newTag]);
  };

  const changeTag = (e, text, id) => {
    const newTag = {
      id: id,
      text: text,
    };
    const idx = tags.findIndex((item) => item.id === id);
    setTags([...tags.slice(0, idx), newTag, ...tags.slice(idx + 1)]);
  };

  const deleteTag = (id) => {
    setTags((tags) => {
      return tags.filter((item) => item.id !== id);
    });
  };

  return (
    <form className={classes.article} onSubmit={submit}>
      <h1 className={classes.article__title}>{titleForm}</h1>
      <label>
        Title
        <input className={classes.input} type="text" placeholder="Title" {...regTitle} />
      </label>
      <label>
        Short description
        <input
          className={classes.input}
          type="text"
          placeholder="Short description"
          {...regDescribe}
        />
      </label>
      <label>
        Text
        <textarea
          className={classes.textarea}
          name={'textarea'}
          cols="30"
          rows="10"
          placeholder="Text"
          {...regText}
        />
      </label>
      <TagsBlock
        tagsArr={tagsArr}
        changeTag={changeTag}
        deleteTag={deleteTag}
        addTag={addTag}
        regTags={regTags}
      />
      <SubmitButton name={'Send'} className={classes.submit} />
    </form>
  );
};

export default ArticleLayout;
