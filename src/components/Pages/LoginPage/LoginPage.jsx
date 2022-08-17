import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import classes from '../../../index.module.scss';
import { fetchLogin } from '../../../store/userSlice';
import Input from '../../Input';
import LastRowForm from '../../LastRowForm';
import SubmitButton from '../../SubmitButton';

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

  const onSubmit = (data) => {
    dispatch(fetchLogin(data));
    setEmail('');
    setPassword('');
    reset();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={classes.title}>Sign in</h3>
      <Input
        label={'Email address'}
        type={'email'}
        placeholder={'Email address'}
        reg={register('email', {
          required: true,
          minLength: 1,
        })}
        err={errors}
      />
      <Input
        label={'Password'}
        type={'password'}
        placeholder={'Password'}
        reg={register('password')}
        err={errors}
      />
      <SubmitButton name={'Login'} />
      <LastRowForm text={'Don’t have an account?'} link={'sign-up'} nameLink={'Sign up'} />
    </form>
  );
};

export default LoginPage;
