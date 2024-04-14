import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputEl } from './inputEl';
import Button from './Button';
import axios from 'axios';
import { updateUrl } from '../../config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdateUserInfoType, UpdateUserObjType } from '../../util/types';

export default function UpdateForm({ email, name, userId }: UpdateUserInfoType) {
  const [error, seterror] = useState('');
  console.log('error ===', error);
  const navigate = useNavigate();
  const formik = useFormik<UpdateUserObjType>({
    initialValues: {
      name: name,
      email: email,
      currentPassword: '',
      password: '',
      passwordConfirm: '',
      avatar_url: '',
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
  function updateUser(url: string, values: Omit<UpdateUserObjType, 'passwordConfirm'>) {
    axios
      .put(url, values)
      .then((res) => {
        console.log('res ===', res);
        navigate('/');
      })
      .catch((err) => {
        console.log('err.response.data ===', err.response.data);
        seterror(err.response.data.error);
        console.warn('err ===', err);
      });
  }

  return (
    <form noValidate className='container mt-4 grid grid-cols-1 gap-5'>
      <InputEl
        name='Vartotojo vardas'
        formik={formik}
        id='name'
        placeholder='Įrašykite naują vartotojo vardą'
        type='text'
      />
      <InputEl
        name='Dabartinis slaptažodis'
        formik={formik}
        id='currentPassword'
        placeholder='Įrašykite dabartinį slaptažodį'
        type='password'
      />
      <InputEl
        name='Naujas slaptažodis'
        formik={formik}
        id='password'
        placeholder='Įrašykite naują slaptažodį'
        type='password'
      />
      <InputEl
        name='Pakartokite naują slaptažodį'
        formik={formik}
        id='passwordConfirm'
        placeholder='Patvirtinkite naują slaptažodį'
        type='password'
      />
      <InputEl
        name='Įveskite jūsų nuotraukos URL'
        formik={formik}
        id='avatar_url'
        placeholder='Įveskite jūsų nuotraukos URL'
      />
      {error && <div className='error'>{error}</div>}
      <Button type='submit' onClick={formik.handleSubmit}>
        Atnaujinti duomenis
      </Button>
    </form>
  );
}
