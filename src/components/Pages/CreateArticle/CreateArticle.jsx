import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addCurrentTag, addNewArticle, showMessage } from '../../../store/articleSlice';
import ArticleLayout from '../../ArticleLayout';
import EventMessage from '../../SideComponents/EventMessage';
import LoadErrorHandler from '../../SideComponents/LoadErrorComponent';

const CreateArticle = () => {
  const { tags, eventMessage, status, error, fullArticle } = useSelector((state) => state.articles);

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
    return <LoadErrorHandler link={'/new-article'} status={status} error={error} />;
  }
  return eventMessage && status === 'fulfilled' && !fullArticle ? (
    <EventMessage text={'Your article has been published'} eventMessage={eventMessage} link={'/article'} />
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
