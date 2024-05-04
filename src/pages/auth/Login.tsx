import { useFormik } from 'formik';
import { useAuthCtx } from '../../store/AuthProvider';
import { LoginObjType, UserObjType } from '../../util/types';
import axios, { AxiosResponse } from 'axios';
import { LoginUrl } from '../../config';
import { InputEl } from '../../components/UI/inputEl';
import Button from '../../components/UI/Button';
import * as Yup from 'yup';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuthCtx();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  function handleLogin(logonObj: LoginObjType) {
    axios
      .post(LoginUrl, logonObj)
      .then((res: AxiosResponse<UserObjType>) => {
        login(res.data.email, res.data.id);
      })
      .catch((err) => {
        console.warn(err);
        setError(err.response.data.error);
      });
  }
  return (
    <div className='container'>
      <h2 className='text-2xl mt-2'>Prisijungti</h2>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        className={'grid grid-cols-1 md:grid-cols-2  mt-2 gap-3 '}
      >
        <InputEl
          name='Jūsų el. paštas'
          type='email'
          formik={formik}
          id={'email'}
          placeholder='jane@email.lt'
        />
        <InputEl
          name='Jūsų slaptažodis'
          type='password'
          formik={formik}
          id={'password'}
          placeholder='įveskite slaptažodį'
        />
        {error && <span className='bg-red-300 block rounded-1 px-3 py-1 '>{error}</span>}
        <Button className='md:col-span-2' type='submit'>
          prisijungiti
        </Button>
      </form>
    </div>
  );
}
