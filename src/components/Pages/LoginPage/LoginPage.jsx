import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../../index.module.scss';
import { fetchLogin } from '../../../store/userSlice';
import Error from '../../Error';
import FieldEmail from '../../FieldEmail';
import FieldPassword from '../../FieldPassword';
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
  const { eventMessage, status, error } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(fetchLogin(data));
    setEmail('');
    setPassword('');
    reset();
  };

  return status === 'rejected' ? (
    <Error error={error} status={status} />
  ) : (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={classes.title}>Sign in</h3>
      <FieldEmail reg={register} err={errors} />
      <FieldPassword reg={register} err={errors} />
      <SubmitButton name={'Login'} />
      <LastRowForm text={'Don’t have an account?'} link={'sign-up'} nameLink={'Sign up'} />
    </form>
  );
};

export default LoginPage;
