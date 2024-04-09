import axios from 'axios';
import { useEffect, useState } from 'react';
import { adsUrl } from '../config';
import { useParams } from 'react-router-dom';
import { AdsObjType } from '../util/types';
import SwiperItem from '../components/UI/SwiperItem';

export default function SingleAdPage() {
  const [adObj, setAdObj] = useState<AdsObjType | null>(null);
  console.log('adObj ===', adObj);

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
      <h3 className='text-3xl'>{adObj?.title}</h3>
      <div className='grid mt-5 gap-5 min-[320px]:grid-cols-1 min-[768px]:grid-cols-2'>
        <div className='w-full'>
          <SwiperItem alt={adObj?.title} withThumbs images={images} />
        </div>
        <div className='grid grid-cols-1 gap-2'>
          <p>
            aprasymas: <span className='font-semibold'>{adObj?.description}</span>
          </p>
          <p>
            kaina: <span className='font-semibold'>{adObj?.price}</span>
          </p>
          <p>
            telefonas: <span className='font-semibold'>{adObj?.phone}</span>
          </p>
          <p>
            miestas: <span className='font-semibold'>{adObj?.town}</span>
          </p>
          <p>
            skelbimo tipas:
            <span className='font-semibold'>
              {adObj?.type === 'rent'
                ? ' nuoma'
                : adObj?.type === 'sell'
                ? ' pardavimas'
                : ' pirkimas'}
            </span>
          </p>
          <p>
            kategorija: <span className='font-semibold'>{adObj?.category}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
