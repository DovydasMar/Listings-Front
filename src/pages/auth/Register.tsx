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
      <h3 className='text-2xl'>Sukurti naują vartotoją</h3>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        <InputEl name='Jūsų vardas' formik={formik} id='name' placeholder='vardas' />
        <InputEl name='Jūsų Email' formik={formik} id='email' placeholder='jane@doe.lt' />
        <InputEl
          name='Įrašykite slaptažodį'
          formik={formik}
          id='password'
          type='password'
          placeholder='slaptažodis'
        />
        <InputEl
          name='Pakartokite slaptažodį'
          formik={formik}
          id='passwordConfirm'
          type='password'
          placeholder='patvirtinkite slaptažodį'
        />
        <InputEl
          name='Įveskite savo nuotraukos Url'
          formik={formik}
          id='avatar_url'
          placeholder='Profilio nuotraukos Url'
        />
        <div></div>
        <Button className='md:col-span-2' type='submit'>
          Registruotis
        </Button>
      </form>
    </div>
  );
}
