import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../../index.module.scss';
import { editProfile } from '../../../store/userSlice';
import Input from '../../Input';
import SubmitButton from '../../SubmitButton';

const EditProfile = () => {
  const { username, email, image } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: username || '',
      email: email || '',
      password: localStorage.getItem('password'),
      image: image || '',
    },
    mode: 'onBlur',
  });

  const onSubmitForm = (data) => {
    dispatch(editProfile(data));
    // reset();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
      <h3 className={classes.title}>Edit Profile</h3>
      {/*<label>*/}
      {/*  Username*/}
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
      {/*  <input*/}
      {/*    placeholder={'Username'}*/}
      {/*    name={'username'}*/}
      {/*    {...register('username', {*/}
      {/*      required: 'Required field',*/}
      {/*      minLength: {*/}
      {/*        value: 3,*/}
      {/*        message: 'Username must be between 3 and 20 characters (inclusive)',*/}
      {/*      },*/}
      {/*      maxLength: {*/}
      {/*        value: 20,*/}
      {/*        message: 'Username must be between 3 and 20 characters (inclusive)',*/}
      {/*      },*/}
      {/*    })}*/}
      {/*  />*/}
      {/*  <div>*/}
      {/*    {errors?.password && (*/}
      {/*      <span className={classes['input-message']}>{errors?.password?.message || Error}</span>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</label>*/}
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
      {/*<label>*/}
      {/*  Email address*/}
      {/*  <input*/}
      {/*    id={'email'}*/}
      {/*    type={'email'}*/}
      {/*    name={'email'}*/}
      {/*    placeholder={'Email address'}*/}
      {/*    {...register('email', {*/}
      {/*      required: 'Required field',*/}
      {/*      pattern: {*/}
      {/*        value:*/}
      {/*          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,*/}
      {/*        message: 'Incorrect email',*/}
      {/*      },*/}
      {/*    })}*/}
      {/*  />*/}
      {/*  <div>*/}
      {/*    {errors.email && (*/}
      {/*      <span className={classes['input-message']}>*/}
      {/*        {errors?.email?.message || errors?.email?.pattern.message}*/}
      {/*      </span>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</label>*/}
      <Input
        label={'Password'}
        type={'password'}
        placeholder={'Password'}
        // value={newPassword}
        // onChangeFunc={addPassword}
        reg={register('password', {
          required: 'Required field',
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
      {/*<label>*/}
      {/*  New password*/}
      {/*  <input*/}
      {/*    name={'password'}*/}
      {/*    type={'password'}*/}
      {/*    placeholder={'New password'}*/}
      {/*    {...register('password', {*/}
      {/*      minLength: {*/}
      {/*        value: 6,*/}
      {/*        message: 'Your password needs to be at least 6 characters.',*/}
      {/*      },*/}
      {/*      maxLength: 40,*/}
      {/*    })}*/}
      {/*  />*/}
      {/*</label>*/}
      {/*<label>*/}
      {/*  Avatar image (url)*/}
      {/*  <input name={'image'} type={'text'} placeholder="Avatar image" />*/}
      {/*</label>*/}
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
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm();
  //
  // return (
  //   <form className={classes.form} onSubmit={() => {}}>
  //     <h3 className={classes.title}>Edit Profile</h3>
  //     <label>
  //       Username
  //       <input
  //         placeholder={'Username'}
  //         {...register('username', {
  //           required: true,
  //           minLength: 3,
  //           maxLength: 20,
  //         })}
  //       />
  //     </label>
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
  //         type={'New password'}
  //         placeholder={'New password'}
  //         {...register('password', {
  //           required: 'Your password needs to be at least 6 characters.',
  //           minLength: 6,
  //           maxLength: 40,
  //         })}
  //       />
  //       {errors?.password && (
  //         <span className={classes['input-message']}>{errors?.password?.message}</span>
  //       )}
  //     </label>
  //     <Input label={'Avatar image (url)'} type={'text'} placeholder="Avatar image (url)" />
  //     <SubmitButton name={'Save'} />
  //   </form>
  // );
};
export default EditProfile;
