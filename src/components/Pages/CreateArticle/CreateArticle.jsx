import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addCurrentTag, addNewArticle, showMessage } from '../../../store/articleSlice';
import { ArticleLayout } from '../../ArticleLayout';
import { EventMessage } from '../../EventMessage';
import { LoadErrorComponent } from '../../LoadErrorComponent';

const CreateArticle = () => {
  const { tags, eventMessage, status, error, fullArticle } = useSelector((state) => state.articles);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (tags.length) {
      dispatch(addCurrentTag([]));
    }
  }, []);
  const { register, reset, handleSubmit } = useForm();

  let tagList = tags.length ? tags.map((tag) => tag.text) : [];
  const onSubmitForm = (data) => {
    const obj = { ...data, tagList };
    dispatch(addNewArticle(obj));
    dispatch(showMessage(true));
    reset();
  };

  if (status === 'rejected') {
    return <LoadErrorComponent link={'new-article'} status={status} error={error} />;
  }

  return eventMessage && status === 'fulfilled' ? (
    <EventMessage
      text={'Your article has been published'}
      eventMessage={eventMessage}
      link={'article'}
    />
  ) : (
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
