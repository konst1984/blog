import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from '../../../index.module.scss';
import { useAddArticleMutation, useAddNewUserMutation } from '../../../store/apiSlice';
import { addNewUserFetch, setLogin } from '../../../store/userSlice';
import Input from '../../Input';
import LastRowForm from '../../LastRowForm';
import SubmitButton from '../../SubmitButton';

import Checkbox from './Checkbox';
import clazz from './CreateAccount.module.scss';

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
  const [newUser, setNewUser] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');

  // useEffect(() => {
  //   dispatch(addNewUserFetch());
  // }, [dispatch]);

  // const [addUser] = useAddNewUserMutation();
  // const handleAddArticle = async () => {
  //   if (addUser) {
  //     await addUser({
  //       user: {
  //         username: newUser,
  //         email: newEmail,
  //         password: newPassword,
  //       },
  //     }).unwrap();
  //     setNewUser('');
  //     setNewEmail('');
  //     setNewPassword('');
  //     setRepPassword('');
  //   }
  // };
  const addUsername = (val) => {
    setNewUser(val);
  };

  const addEmail = (val) => {
    setNewEmail(val);
  };
  const addPassword = (val) => {
    setNewPassword(val);
  };
  const testPassword = (val) => {
    setRepPassword(val);
  };

  function onSubmit(data) {
    console.log(data);
    dispatch(addNewUserFetch(data));
    // handleAddArticle();
    // dispatch(setLogin());
    navigate('/sign-in');
    reset();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={classes.title}>Create new account</p>
      <Input
        label={'Username'}
        placeholder={'Username'}
        // value={newUser}
        // onChangeFunc={addUsername}
        reg={register('username', {
          required: 'Required field',
          minLength: {
            value: 3,
            message: 'Username must be between 3 and 20 characters (inclusive)',
          },
          maxLength: {
            value: 20,
            message: 'Username must be between 3 and 20 characters (inclusive)',
          },
        })}
        err={errors}
      />
      <Input
        label={'Email address'}
        type={'email'}
        placeholder={'Email address'}
        reg={register('email', {
          required: 'Required field',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Incorrect email',
          },
        })}
        err={errors}
      />
      <Input
        label={'Password'}
        type={'password'}
        placeholder={'Password'}
        // value={newPassword}
        // onChangeFunc={addPassword}
        reg={register('password', {
          required: 'Your password needs to be at least 6 characters.',
          minLength: {
            value: 6,
            message: 'Your password needs to be at least 6 characters.',
          },
          maxLength: {
            value: 40,
            message: 'Your password must not contain more than 40 characters',
          },
        })}
        err={errors}
      />
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
