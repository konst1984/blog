import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../../index.module.scss';
import { editProfile } from '../../../store/userSlice';
import Input from '../../Input';
import SubmitButton from '../../SubmitButton';
import Error from '../../SideComponents/Error';
import FieldEmail from '../../Input/FieldEmail';
import FieldPassword from '../../Input/FieldPassword';
import FieldName from '../../Input/FieldName';

const EditProfile = () => {
  const dispatch = useDispatch();

  const { eventMessage, status } = useSelector((state) => state.user);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: localStorage.getItem('user') || '',
      email: localStorage.getItem('email') || '',
      password: localStorage.getItem('password') || '',
      image: localStorage.getItem('avatar') || './images/avatar.svg',
    },
    mode: 'onBlur',
  });

  const onSubmitForm = (data) => {
    dispatch(editProfile(data));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
      <h3 className={classes.title}>Edit Profile</h3>
      <FieldName reg={register} err={errors} />
      {/*<Input*/}
      {/*  label={'Username'}*/}
      {/*  placeholder={'Username'}*/}
      {/*  reg={register('username', {*/}
      {/*    required: 'Required field',*/}
      {/*    minLength: {*/}
      {/*      value: 3,*/}
      {/*      message: 'Username must be between 3 and 20 characters (inclusive)',*/}
      {/*    },*/}
      {/*    maxLength: {*/}
      {/*      value: 20,*/}
      {/*      message: 'Username must be between 3 and 20 characters (inclusive)',*/}
      {/*    },*/}
      {/*  })}*/}
      {/*  err={errors}*/}
      {/*/>*/}
      <FieldEmail reg={register} err={errors} />
      {/*<Input*/}
      {/*  label={'Email address'}*/}
      {/*  type={'email'}*/}
      {/*  placeholder={'Email address'}*/}
      {/*  reg={register('email', {*/}
      {/*    required: 'Required field',*/}
      {/*    pattern: {*/}
      {/*      value:*/}
      {/*        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,*/}
      {/*      message: 'Incorrect email',*/}
      {/*    },*/}
      {/*  })}*/}
      {/*  err={errors}*/}
      {/*/>*/}
      {/*<Input*/}
      {/*  label={'Password'}*/}
      {/*  type={'password'}*/}
      {/*  placeholder={'Password'}*/}
      {/*  reg={register('password', {*/}
      {/*    required: 'Required field',*/}
      {/*    minLength: {*/}
      {/*      value: 6,*/}
      {/*      message: 'Your password needs to be at least 6 characters.',*/}
      {/*    },*/}
      {/*    maxLength: {*/}
      {/*      value: 40,*/}
      {/*      message: 'Your password must not contain more than 40 characters',*/}
      {/*    },*/}
      {/*  })}*/}
      {/*  err={errors}*/}
      {/*/>*/}
      <FieldPassword reg={register} err={errors} />
      <Input
        label={'Avatar image (url)'}
        type={'text'}
        placeholder="Avatar image (url)"
        reg={register('image', {
          pattern: {
            value:
              /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i,
            message: 'Incorrect url',
          },
        })}
        err={errors}
      />
      <SubmitButton name={'Save'} />
    </form>
  );
};
export default EditProfile;
