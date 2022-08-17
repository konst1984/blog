import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { editArticle } from '../../../store/articleSlice';
import { tagsArray } from '../../../utilites/helpers';
import ArticleLayout from '../../ArticleLayout';

const EditArticlePage = () => {
  const { id } = useParams();
  const { fullArticle } = useSelector((state) => state.articles);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: fullArticle?.title || '',
      description: fullArticle?.description || '',
      body: fullArticle?.body || '',
    },
  });

  useEffect(() => {
    if (fullArticle.tagList) {
      const tagArray = fullArticle.tagList.map((tag) => tagsArray(tag));
      setTags(tagArray);
    }
  }, [id]);

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
  const tagList = tags && tags.length ? tags.map((tag) => tag.text) : null;
  const onSubmitForm = (data) => {
    const obj = { ...data, tagList };
    dispatch(editArticle(obj));
    reset();
  };

  return (
    <ArticleLayout
      tagsArr={tags}
      // titleArticle={fullArticle.title}
      // description={fullArticle.description}
      // body={fullArticle.body}
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
      changeTag={changeTag}
      addTag={addTag}
      deleteTag={deleteTag}
      titleForm={'Edit article'}
      submit={handleSubmit(onSubmitForm)}
    />
  );
};
export default EditArticlePage;
