import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from '../../../index.module.scss';
import { addNewUserFetch, setLogin } from '../../../store/userSlice';
import Input from '../../Input';
import LastRowForm from '../../LastRowForm';
import SubmitButton from '../../SubmitButton';

import Checkbox from './Checkbox';
import FieldName from '../../Input/FieldName';
import FieldEmail from '../../Input/FieldEmail';
import FieldPassword from '../../Input/FieldPassword';

const CreateAccount = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(data) {
    dispatch(addNewUserFetch(data));
    navigate('/sign-in');
    reset();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={classes.title}>Create new account</p>
      <FieldName reg={register} err={errors} />
      <FieldEmail reg={register} err={errors} />
      <FieldPassword reg={register} err={errors} />
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
      {/*    required: 'Your password needs to be at least 6 characters.',*/}
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
      <Input
        label={'Repeat password'}
        type={'password'}
        placeholder={'Password'}
        reg={register('password-repeat', {
          required: 'Required field',
          validate: (value) => value === watch('password') || 'The passwords do not match!',
        })}
        err={errors}
      />
      <Checkbox
        reg={register('checkbox', {
          required: 'You must consent to the processing of personal data',
        })}
        err={errors}
      />
      <SubmitButton name={'Create'} />
      <LastRowForm text={'Already have an account?'} link={'sign-In'} nameLink={'Sign In'} />
    </form>
  );
};

export default CreateAccount;
