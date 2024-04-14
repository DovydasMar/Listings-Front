import axios from 'axios';
import { useEffect, useState } from 'react';
import { townAdsUrl, townUrl } from '../config';
import { useParams } from 'react-router-dom';
import { AdsObjType, TownObjType } from '../util/types';
import TownSwiper from '../components/UI/SwiperItem';
import SingleAd from '../components/UI/SingleAd';

export default function SingleTownPage() {
  const [town, setTown] = useState<TownObjType | null>(null);
  console.log(town);
  const { town_id } = useParams();
  const [adsArr, setAdsArr] = useState([]);
  console.log('adsArr ===', adsArr);
  const singleTownUrl = `${townUrl}/${town_id}`;

  console.log('town_id ===', town_id);
  useEffect(() => {
    getTown(singleTownUrl);
    getAds(`${townAdsUrl}/${town_id}`);
  }, [singleTownUrl, town_id]);
  function getTown(url: string) {
    axios
      .get(url)
      .then((res) => {
        setTown(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  function getAds(url: string) {
    axios
      .get(url)
      .then((res) => {
        setAdsArr(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  return (
    <div className='container mb-4'>
      <div className='grid mt-5 gap-5 min-[320px]:grid-cols-1 min-[768px]:grid-cols-2'>
        <div className='w-full p-'>
          <TownSwiper
            alt={town?.name}
            images={[town?.img_url || '', town?.img_1 || '', town?.img_2 || '', town?.img_3 || '']}
          />
          <h2 className='text-2xl font-bold'>{town?.name}</h2>
          <p>{town?.area} Km²</p>
          <p>{town?.population} gyventojų</p>
          <p>{town?.description}</p>
        </div>
        <div>
          <ul className='grid lg:grid-cols-3 grid-cols-1 gap-2'>
            {adsArr.map((ad: AdsObjType) => (
              <li key={ad.id}>
                <SingleAd item={ad} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
