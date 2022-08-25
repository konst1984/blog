import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addCurrentTag, editArticle, showMessage } from '../../../store/articleSlice';
import { tagsCreator } from '../../../utilites/helpers';
import ArticleLayout from '../../ArticleLayout';
import EventMessage from '../../EventMessage';
import LoadErrorHandler from '../../LoadErrorComponent';

const EditArticlePage = () => {
  const { id } = useParams();
  const { fullArticle, eventMessage, status, error } = useSelector((state) => state.articles);

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
    dispatch(showMessage(true));
    reset();
  };

  if (status === 'rejected') {
    return <LoadErrorHandler link={'/articles'} status={status} error={error} />;
  }
  return eventMessage && status === 'fulfilled' ? (
    <EventMessage
      text={'Your article has been edited'}
      eventMessage={eventMessage}
      link={'/article'}
    />
  ) : (
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
