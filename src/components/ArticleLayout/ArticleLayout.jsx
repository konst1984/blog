import React, { memo, useEffect, useState } from 'react';

import SubmitButton from '../SubmitButton';

import classes from './ArticleLayout.module.scss';
import TagsBlock from './TagsBlock';
// import { useDispatch } from 'react-redux';
// import { addNewArticle } from '../../store/articleSlice';

const ArticleLayout = ({
  tagsArr,
  titleForm,
  body,
  titleArticle,
  description,
  regTitle,
  regDescribe,
  regText,
  submit,
  setNewItem,
  changeTag,
  deleteTag,
  tagValue,
  addTag,
  regTags,
  addValueTag,
}) => {
  // const [titleArticleT, setTitleArticle] = useState('');
  // const [descriptionT, setDescription] = useState('');
  // const [bodyT, setBody] = useState('');
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   setTitleArticle(titleArticle);
  //   setBody(body);
  //   setDescription(description);
  // }, [titleArticle, body, description]);

  // const addArticle = () => {
  //   dispatch(addNewArticle({}));
  // };
  return (
    <form className={classes.article} onSubmit={submit}>
      <h1 className={classes.article__title}>{titleForm}</h1>
      <label>
        Title
        <input
          className={classes.input}
          type="text"
          placeholder="Title"
          // value={titleArticleT}
          {...regTitle}
          // onChange={(e) => {
          //   setTitleArticle(e.target.value);
          // }}
          // onChange={(e) => setNewItem()}
        />
      </label>
      <label>
        Short description
        <input
          className={classes.input}
          type="text"
          placeholder="Short description"
          // value={descriptionT}
          {...regDescribe}
          // onChange={(e) => {
          //   setDescription(e.target.value);
          // }}
          // onChange={(e) => setNewItem()}
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
          // value={bodyT}
          {...regText}
          // onChange={(e) => {
          //   setBody(e.target.value);
          // }}
          // onChange={(e) => setNewItem()}
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
