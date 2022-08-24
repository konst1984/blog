import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from '../../../index.module.scss';
import { addNewUserFetch } from '../../../store/userSlice';
import Checkbox from '../../Checkbox';
import FieldEmail from '../../FieldEmail';
import FieldName from '../../FieldName';
import FieldPassword from '../../FieldPassword';
import Input from '../../Input';
import LastRowForm from '../../LastRowForm';
import SubmitButton from '../../SubmitButton';

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
