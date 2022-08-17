import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { editArticle } from '../../../store/articleSlice';
import { tagsCreator } from '../../../utilites/helpers';
import ArticleLayout from '../../ArticleLayout';

const EditArticlePage = () => {
  const { id } = useParams();
  const { fullArticle } = useSelector((state) => state.articles);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      title: fullArticle?.title || '',
      description: fullArticle?.description || '',
      body: fullArticle?.body || '',
    },
  });

  useEffect(() => {
    if (fullArticle.tagList) {
      const tagArray = fullArticle.tagList.map((tag) => tagsCreator(tag));
      setTags(tagArray);
    }
  }, [id]);

  const tagList = tags && tags.length ? tags.map((tag) => tag.text) : null;
  const onSubmitForm = (data) => {
    const obj = { ...data, tagList };
    dispatch(editArticle(obj));
    reset();
  };

  return (
    <ArticleLayout
      tagsArr={tags}
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
      tags={tags}
      setTags={setTags}
      titleForm={'Edit article'}
      submit={handleSubmit(onSubmitForm)}
    />
  );
};
export default EditArticlePage;
