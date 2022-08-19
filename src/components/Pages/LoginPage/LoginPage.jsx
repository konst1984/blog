import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../../index.module.scss';
import { fetchLogin } from '../../../store/userSlice';
import Input from '../../Input';
import LastRowForm from '../../LastRowForm';
import SubmitButton from '../../SubmitButton';
import LoadErrorHandler from '../../SideComponents/LoadErrorComponent';
import Error from '../../SideComponents/Error';
import FieldEmail from '../../Input/FieldEmail';
import FieldPassword from '../../Input/FieldPassword';

const LoginPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { eventMessage, status, error } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(fetchLogin(data));
    setEmail('');
    setPassword('');
    reset();
  };

  console.log(typeof register());

  return status === 'rejected' ? (
    <Error error={error} status={status} />
  ) : (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={classes.title}>Sign in</h3>
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
      <FieldPassword reg={register} err={errors} />
      <SubmitButton name={'Login'} />
      <LastRowForm text={'Don’t have an account?'} link={'sign-up'} nameLink={'Sign up'} />
      {/*{status === 'rejected' && (*/}
      {/*  <div*/}
      {/*    className={classes['error-message']}*/}
      {/*    style={{ textAlign: 'center', color: 'red', fontSize: '16px', width: '100%' }}*/}
      {/*  >*/}
      {/*    Check the correctness of the entered data!*/}
      {/*  </div>*/}
      {/*)}*/}
    </form>
  );
};

export default LoginPage;
