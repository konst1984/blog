import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import classes from '../../../index.module.scss';
import { useSignInMutation } from '../../../store/apiSlice';
import { fetchLogin, setLogin } from '../../../store/userSlice';
import Input from '../../Input';
import LastRowForm from '../../LastRowForm';
import SubmitButton from '../../SubmitButton';

const LoginPage = () => {
  const Location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [loginIn] = useSignInMutation();
  //
  // const handleLogin = async () => {
  //   if (loginIn) {
  //     await loginIn({
  //       user: {
  //         email,
  //         password,
  //       },
  //     }).unwrap();
  //     setEmail('');
  //     setPassword('');
  //   }
  // };

  //
  const loginEmail = (val) => {
    setEmail(val);
  };

  const loginPassword = (val) => {
    setPassword(val);
  };

  const onSubmit = (data) => {
    dispatch(fetchLogin(data));
    // handleLogin();
    // navigate('/articles');
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
        // value={email}
        // onChangeFunc={loginEmail}
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
        // value={password}
        // onChangeFunc={loginPassword}
        placeholder={'Password'}
        reg={register('password')}
        err={errors}
      />
      <SubmitButton name={'Login'} />
      <LastRowForm text={'Don’t have an account?'} link={'sign-up'} nameLink={'Sign up'} />
    </form>
  );
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm();
  //
  // return (
  //   <form className={classes.form} onSubmit={() => {}}>
  //     <h3 className={classes.title}>Sign in</h3>
  //     <label>
  //       Email address
  //       <input
  //         placeholder={'Email address'}
  //         {...register('email', {
  //           required: true,
  //           minLength: 1,
  //         })}
  //       />
  //     </label>
  //     <label>
  //       Password
  //       <input
  //         type={'password'}
  //         placeholder={'Password'}
  //         {...register('password', {
  //           required: true,
  //           minLength: 1,
  //         })}
  //       />
  //     </label>
  //     <SubmitButton name={'Login'} />
  //     <LastRowForm text={'Don’t have an account?'} link={'sign-up'} nameLink={'Sign up'} />
  //   </form>
  // );
};

export default LoginPage;
