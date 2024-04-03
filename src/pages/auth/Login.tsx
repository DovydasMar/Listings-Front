import { useFormik } from 'formik';
import { useAuthCtx } from '../../store/AuthProvider';
import { LoginObjType, UserObjType } from '../../util/types';
import axios, { AxiosResponse } from 'axios';
import { LoginUrl } from '../../config';
import { InputEl } from '../../components/UI/inputEl';
import Button from '../../components/UI/Button';

export default function Login() {
  const { login } = useAuthCtx();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
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
      });
  }
  return (
    <div>
      <h2>Login here</h2>
      <form noValidate onSubmit={formik.handleSubmit}>
        <InputEl type='email' formik={formik} id={'email'} placeholder='Enter email' />
        <InputEl type='password' formik={formik} id={'password'} placeholder='Enter passwrod' />
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
}
