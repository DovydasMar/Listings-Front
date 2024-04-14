import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CategoryObjType, TownObjType, adObjtoBackType } from '../util/types';
import axios, { AxiosResponse } from 'axios';
import { adsUrl, catsUrl, townUrl } from '../config';
import { InputEl } from '../components/UI/inputEl';
import { useAuthCtx } from '../store/AuthProvider';
import Button from '../components/UI/Button';
import { SelectEl } from '../components/UI/SelectEl';
import { useNavigate } from 'react-router-dom';

export default function AddNewAdPage() {
  const navigate = useNavigate();
  useEffect(() => {
    getCategories();
    getTowns();
  }, []);

  const [categories, setCategories] = useState<CategoryObjType[]>([]);
  const [townsArr, settownsArr] = useState<TownObjType[]>([]);
  const [error, setError] = useState('');
  console.log('error ===', error);
  const { userId } = useAuthCtx();

  function getCategories() {
    axios
      .get(catsUrl)
      .then((res: AxiosResponse<CategoryObjType[]>) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function getTowns() {
    axios
      .get(townUrl)
      .then((res: AxiosResponse<TownObjType[]>) => {
        settownsArr(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      main_img_url: '',
      description: '',
      price: '',
      phone: '',
      town_id: '',
      category_id: '',
      type: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('pavadinimas yra privalomas'),
      main_img_url: Yup.string().required('nuotrauka yra privaloma'),
      description: Yup.string().min(10).required('aprašymo laukas yra privalomas'),
      price: Yup.number().required('prašome įvesti kainą'),
      phone: Yup.string().required('prašome įvesti telefono numerį'),
      town_id: Yup.number().required('prašome pasirinkti miestą').label('City'),
      category_id: Yup.string().required(' prašome pasirinkti kategoriją').label('Category'),
      type: Yup.string().required('prašome pasirinkti skelbimo tipą'),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      const adObjtoBack = {
        ...values,
        price: +values.price,
        phone: +values.phone,
        town_id: +values.town_id,
        category_id: +values.category_id,
        user_id: userId,
      };
      handleAddNewAd(adObjtoBack);
    },
  });

  function handleAddNewAd(obj: adObjtoBackType) {
    axios
      .post(adsUrl, obj)
      .then((res) => {
        console.log('res ===', res);
        navigate('/');
      })
      .catch((err) => {
        console.warn(err);
        setError(err.response.data.error);
      });
  }
  const typeError = formik.errors.type && formik.touched.type;
  return (
    <div className='container'>
      <h3 className='text-2xl'>Create a new Listing</h3>
      <form onSubmit={formik.handleSubmit} noValidate className='grid grid-cols-2 gap-4'>
        <InputEl name='įveskite pavadinimą' formik={formik} id='title' placeholder='Enter title' />
        <InputEl
          name='pasirinkite nuotrauką įvesdami URL'
          formik={formik}
          id='main_img_url'
          placeholder='choose image'
        />
        <InputEl
          name='Aprašymas'
          formik={formik}
          id='description'
          placeholder='Enter description'
        />
        <InputEl name='Įveskite kainą' formik={formik} id='price' placeholder='Enter price' />
        <InputEl
          name='jūsų telefono numeris'
          formik={formik}
          id='phone'
          placeholder='Enter phone'
        />
        <SelectEl
          formik={formik}
          id='category_id'
          name='Pasirinkite kategoriją'
          options={categories}
          placeholder='Pasirinkite kategoriją'
        />
        <SelectEl
          formik={formik}
          id='town_id'
          name='Pasirinkite miestą'
          options={townsArr}
          placeholder='Pasirinkite miestą'
        />
        <SelectEl
          formik={formik}
          id='type'
          name='Pasirinkite skelbimo tipą'
          options={[
            { id: 1, name: 'sell' },
            { id: 2, name: 'rent' },
            { id: 3, name: 'buy' },
          ]}
          placeholder='Pasirinkite skelbimo tipą'
        />

        {typeError && <div className='error'>{error}</div>}
        <Button className='col-span-2' type='submit'>
          Add new listing
        </Button>
      </form>
    </div>
  );
}
