import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CategoryObjType, TownObjType, adObjtoBackType } from '../util/types';
import axios, { AxiosResponse } from 'axios';
import { adsUrl, catsUrl, townUrl } from '../config';
import { InputEl } from '../components/UI/inputEl';
import { useAuthCtx } from '../store/AuthProvider';
import Button from '../components/UI/Button';

export default function AddNewAdPage() {
  useEffect(() => {
    getCategories();
    getTowns();
  }, []);

  const [categories, setCategories] = useState<CategoryObjType[]>([]); // Specify CategoryObjType for type safety
  const [townsArr, settownsArr] = useState<TownObjType[]>([]); // Specify TownObjType for type safety
  const { userId } = useAuthCtx();

  function getCategories() {
    axios
      .get(catsUrl)
      .then((res: AxiosResponse<CategoryObjType[]>) => {
        // Specify response type
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
        // Specify response type
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
      title: Yup.string().required(),
      main_img_url: Yup.string().required(),
      description: Yup.string().min(10).required(),
      price: Yup.number().required(),
      phone: Yup.string().required(),
      town_id: Yup.number().required(),
      category_id: Yup.string().required(),
      type: Yup.string().required(),
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
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <div className='container'>
      <h3 className='text-2xl'>Create a new Listing</h3>
      <form onSubmit={formik.handleSubmit} noValidate className='grid grid-cols-2 gap-4'>
        <InputEl formik={formik} id='title' placeholder='Enter title' />
        <InputEl formik={formik} id='main_img_url' placeholder='choose image' />
        <InputEl formik={formik} id='description' placeholder='Enter description' />
        <InputEl formik={formik} id='price' placeholder='Enter price' />
        <InputEl formik={formik} id='phone' placeholder='Enter phone' />
        <select className='border border-black rounded-sm' {...formik.getFieldProps('category_id')}>
          <option value='' disabled>
            Select category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select className='border border-black rounded-sm' {...formik.getFieldProps('town_id')}>
          <option value='' disabled>
            Select town
          </option>
          {townsArr.map((town) => (
            <option key={town.id} value={town.id}>
              {town.name}
            </option>
          ))}
        </select>
        <select className='border border-black rounded-sm' {...formik.getFieldProps('type')}>
          <option value='' disabled>
            select listing type
          </option>
          <option value='sell'>sell</option>
          <option value='rent'>rent</option>
          <option value='buy'>buy</option>
        </select>
        <Button className='col-span-2' type='submit'>
          Add new listing
        </Button>
      </form>
    </div>
  );
}
