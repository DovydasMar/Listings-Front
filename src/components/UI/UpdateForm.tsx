import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputEl } from './inputEl';
import Button from './Button';
import axios from 'axios';
import { updateUrl } from '../../config';
import { useState } from 'react';

type UpdateUserInfoType = {
  email: string;
  name: string;
  userId: number;
};
type UpdateUserObjType = {
  name?: string;
  email: string;
  currentPassword: string;
  password: string;
  passwordConfirm: string;
};

export default function UpdateForm({ email, name, userId }: UpdateUserInfoType) {
  const [error, seterror] = useState('');
  console.log('error ===', error);
  const formik = useFormik<UpdateUserObjType>({
    initialValues: {
      name: name,
      email: email,
      currentPassword: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      currentPassword: Yup.string().required(),
      password: Yup.string().required(),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required(),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordConfirm, ...valuesToSend } = values;
      console.log('valuesToSend ===', valuesToSend);
      updateUser(`${updateUrl}/${userId}`, valuesToSend);
    },
  });
  function updateUser(url: string, values: string | object) {
    axios
      .put(url, values)
      .then((res) => {
        console.log('res ===', res);
        seterror('');
        formik.resetForm();
      })
      .catch((err) => {
        console.log('err.response.data ===', err.response.data);
        seterror(err.response.data.error);
        console.warn('err ===', err);
      });
  }

  return (
    <form noValidate className='container'>
      <InputEl formik={formik} id='name' placeholder='enter your new username' type='text' />
      <InputEl
        formik={formik}
        id='currentPassword'
        placeholder='enter your current password'
        type='password'
      />
      <InputEl
        formik={formik}
        id='password'
        placeholder='enter your new password'
        type='password'
      />
      <InputEl
        formik={formik}
        id='passwordConfirm'
        placeholder='confirm your new password'
        type='password'
      />
      {error && <div className='error'>{error}</div>}
      <Button type='submit' onClick={formik.handleSubmit}>
        Atnaujinti duomenis
      </Button>
    </form>
  );
}
