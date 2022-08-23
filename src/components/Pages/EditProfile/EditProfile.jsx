import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../../index.module.scss';
import { editProfile } from '../../../store/userSlice';
import Input from '../../Input';
import FieldEmail from '../../Input/FieldEmail';
import FieldName from '../../Input/FieldName';
import FieldPassword from '../../Input/FieldPassword';
import SubmitButton from '../../SubmitButton';

const EditProfile = () => {
  const dispatch = useDispatch();

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
      <FieldEmail reg={register} err={errors} />
      <FieldPassword reg={register} err={errors} />
      <Input
        label={'Avatar image (url)'}
        type={'text'}
        placeholder="Avatar image (url)"
        reg={register('image', {
          pattern: {
            value: /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i,
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
