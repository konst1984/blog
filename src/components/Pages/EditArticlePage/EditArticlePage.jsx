import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addCurrentTag, editArticle } from '../../../store/articleSlice';
import { tagsCreator } from '../../../utilites/helpers';
import ArticleLayout from '../../ArticleLayout';

const EditArticlePage = () => {
  const { id } = useParams();
  const { fullArticle } = useSelector((state) => state.articles);

  const { tags } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      title: fullArticle?.title || '',
      description: fullArticle?.description || '',
      body: fullArticle?.body || '',
    },
  });

  useEffect(() => {
    if (fullArticle && fullArticle.tagList) {
      const tagArray = fullArticle.tagList.map((tag) => tagsCreator(tag));
      dispatch(addCurrentTag(tagArray));
    }
  }, [id, fullArticle]);

  const tagList = tags && tags.length ? tags.map((tag) => tag.text) : [];
  const onSubmitForm = (data) => {
    const obj = { ...data, tagList };
    dispatch(editArticle(obj));
    reset();
  };

  return (
    <ArticleLayout
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
      titleForm={'Edit article'}
      submit={handleSubmit(onSubmitForm)}
    />
  );
};
export default EditArticlePage;
