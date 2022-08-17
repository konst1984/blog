import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addNewArticle } from '../../../store/articleSlice';
import ArticleLayout from '../../ArticleLayout';

const CreateArticle = () => {
  const [tags, setTags] = useState([]);
  // const tags = useSelector((state) => state.articles.tags);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  let tagList = tags.length && tags.map((tag) => tag.text);
  const onSubmitForm = (data) => {
    const obj = { ...data, tagList };
    dispatch(addNewArticle(obj));
    setTags([]);
    reset();
  };

  return (
    <ArticleLayout
      tagsArr={tags}
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
      tags={tags}
      setTags={setTags}
    />
  );
};
export default CreateArticle;
