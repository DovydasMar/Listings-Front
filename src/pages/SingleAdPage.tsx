import axios from 'axios';
import { useEffect, useState } from 'react';
import { adsUrl } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import { AdsObjType } from '../util/types';
import SwiperItem from '../components/UI/SwiperItem';
import Button from '../components/UI/Button';
import { useAuthCtx } from '../store/AuthProvider';

export default function SingleAdPage() {
  const [adObj, setAdObj] = useState<AdsObjType | null>(null);
  const { userId } = useAuthCtx();
  console.log('adObj ===', adObj);
  const navigate = useNavigate();

  const { ad_id } = useParams();
  console.log('ad_id ===', ad_id);

  useEffect(() => {
    getAd(ad_id);
  }, [ad_id]);

  function getAd(id: string | undefined) {
    axios
      .get(`${adsUrl}/${id}`)
      .then((res) => {
        setAdObj(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  function deleteAd(id: number | undefined) {
    axios
      .delete(`${adsUrl}/${id}`)
      .then((res) => {
        console.log('res ===', res);
        navigate('/');
      })
      .catch((err) => {
        console.warn('err ===', err);
      });
  }
  const images = [
    adObj?.main_img_url || '',
    adObj?.pic1 || '',
    adObj?.pic2 || '',
    adObj?.pic3 || '',
    adObj?.pic4 || '',
    adObj?.pic5 || '',
  ];
  return (
    <div className='container'>
      <div className='grid mt-5 gap-5 min-[320px]:grid-cols-1 min-[768px]:grid-cols-2'>
        <div className='w-full'>
          <SwiperItem alt={adObj?.title} withThumbs images={images} />
        </div>
        <div className='grid grid-cols-1 gap-2 bg-slate-50 border border-slate-100 rounded-md p-4'>
          <h3 className='text-3xl font-semibold'>{adObj?.title}</h3>
          <p>
            <span className=' rounded-full px-2 py-1 bg-[#ff9540] text-white'>
              <i className='bi bi-cash '></i>
            </span>{' '}
            <span className='font-semibold'>€ {adObj?.price}</span>
          </p>
          <p>
            <span className=' rounded-full px-2 py-1 bg-[#ff9540] text-white'>
              <i className='bi bi-telephone '></i>
            </span>{' '}
            <span className='font-semibold'>{adObj?.phone}</span>
          </p>
          <p>
            <button className=' rounded-full px-2 py-1 bg-[#ff9540] text-white'>
              <i className='bi bi-geo-alt-fill '></i>
            </button>{' '}
            <span className='font-semibold'>{adObj?.town}</span>
          </p>
          <p className='text-xl mb-0 font-semibold'>
            Description: <br /> <span className='font-normal'>{adObj?.description}</span>
          </p>

          <p>
            skelbimo tipas:
            <span className='font-semibold'>
              {adObj?.type === 'rent'
                ? ' nuomoja'
                : adObj?.type === 'sell'
                ? ' parduoda'
                : adObj?.type === 'buy'
                ? ' perka'
                : 'nežinoma'}
            </span>
          </p>
          <p>
            kategorija: <span className='font-semibold'>{adObj?.category}</span>
          </p>
          <div className='grid grid-cols-2'>
            {adObj?.user_id === userId && (
              <Button danger onClick={() => deleteAd(adObj?.id)}>
                ištrinti
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
