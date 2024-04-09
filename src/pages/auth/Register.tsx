/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/AuthProvider';
import { RegisterObjType, UserObjType } from '../../util/types';
import { regUrl } from '../../config';
import axios, { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { InputEl } from '../../components/UI/inputEl';
import Button from '../../components/UI/Button';

export default function Register() {
  const { login } = useAuthCtx();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      avatar_url: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required(),
      avatar_url: Yup.string(),
    }),
    onSubmit: (values) => {
      const { passwordConfirm, ...finalRegisterObj } = values;
      handleRegister(finalRegisterObj);
    },
  });
  function handleRegister(registerObj: RegisterObjType) {
    axios
      .post(regUrl, registerObj)
      .then((res: AxiosResponse<UserObjType>) => {
        login(res.data.email, res.data.id);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  return (
    <div className='container'>
      <h3 className='text-2xl'>Create a new account</h3>
      <form noValidate onSubmit={formik.handleSubmit} className='grid grid-cols-2 gap-4'>
        <InputEl formik={formik} id='name' placeholder='Enter name' />
        <InputEl formik={formik} id='email' placeholder='Enter email' />
        <InputEl formik={formik} id='password' type='password' placeholder='Enter passwrod' />
        <InputEl
          formik={formik}
          id='passwordConfirm'
          type='password'
          placeholder='please confirm password'
        />
        <InputEl formik={formik} id='avatar_url' placeholder='pick your photo' />
        <Button type='submit'>Register</Button>
      </form>
    </div>
  );
}
