import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addCurrentTag, addNewArticle } from '../../../store/articleSlice';
import ArticleLayout from '../../ArticleLayout';

const CreateArticle = () => {
  const { tags } = useSelector((state) => state.articles);

  const dispatch = useDispatch();
  useEffect(() => {
    if (tags.length) {
      dispatch(addCurrentTag([]));
    }
  }, []);
  const { register, reset, handleSubmit } = useForm();

  let tagList = tags.length && tags.map((tag) => tag.text);
  const onSubmitForm = (data) => {
    const obj = { ...data, tagList };
    dispatch(addNewArticle(obj));
    // setTags([]);
    reset();
  };

  return (
    <ArticleLayout
      titleForm={'Create new article'}
      regTitle={register('title', {
        required: true,
      })}
      regDescribe={register('description', {
        required: true,
      })}
      regText={register('body', {
        required: true,
      })}
      regTags={(id) => register(`Tag${id}`)}
      submit={handleSubmit(onSubmitForm)}
    />
  );
};
export default CreateArticle;
