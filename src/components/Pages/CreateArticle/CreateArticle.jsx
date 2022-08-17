import React, { useCallback, useEffect, useState } from 'react';

import { Button } from 'antd';
import { formatDistanceToNowStrict } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAddArticleMutation } from '../../../store/apiSlice';
import { addNewArticle } from '../../../store/articleSlice';
import { getUser } from '../../../store/userSlice';
import { tagsArray } from '../../../utilites/helpers';
import ArticleLayout from '../../ArticleLayout';
import classes from '../../ArticleLayout/ArticleLayout.module.scss';
import Tag from '../../ArticleLayout/Tag';
import TagsBlock from '../../ArticleLayout/TagsBlock';
import SubmitButton from '../../SubmitButton';

const CreateArticle = () => {
  const [tags, setTags] = useState([]);
  // const [newArticle, setNewArticle] = useState('');
  // const [titleArticle, setTitleArticle] = useState('');
  // const [description, setDescription] = useState('');
  // const [body, setBody] = useState('');
  // const [tagVal, setTagVal] = useState([]);
  // useEffect(() => {
  //   setTagVal(tags.map((tag) => tag.text));
  // }, [tags]);

  const dispatch = useDispatch();

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

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  // const [addArticle] = useAddArticleMutation();
  // const handleAddArticle = async () => {
  //   // if (newArticle) {
  //   await addArticle({ title: 'Title', description: 'description', body: 'body' }).unwrap();
  //   // setNewArticle('');
  //   // }
  // };
  const tagList = tags.length && tags.map((tag) => tag.text);
  const onSubmitForm = (data) => {
    // handleAddArticle().then((dat) => console.log(dat));
    // dispatch(getUser());
    const obj = { ...data, tagList };
    dispatch(addNewArticle(obj));
    setTags([]);
    reset();
  };

  return (
    <ArticleLayout
      tagsArr={tags}
      titleForm={'Create new article'}
      // body={body}
      // titleArticle={titleArticle}
      // description={description}
      // setNewItem={() => {}}
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
      changeTag={changeTag}
      addTag={addTag}
      deleteTag={deleteTag}
      // submit={handleAddArticle}
    />
  );
};
export default CreateArticle;
