import { useEffect, useState } from 'react';
import { baseBeUrl } from '../config';
import axios from 'axios';
import SingleAd from '../components/UI/SingleAd';
import { AdsObjType, TownObjType } from '../util/types';

const adsUrl = `${baseBeUrl}/api/ads`;
const townUrl = `${baseBeUrl}/api/towns`;
const catsUrl = `${baseBeUrl}/api/categories`;

export default function HomePage() {
  const [adArr, setAdArr] = useState([]);
  const [townArr, setTownArr] = useState([]);
  const [catsArr, setCatsArr] = useState([]);
  console.log('adArr ===', adArr);
  console.log('townArr ===', townArr);
  console.log('catsArr ===', catsArr);

  useEffect(() => {
    getAds(adsUrl);
    getTowns(townUrl);
    getCats(catsUrl);
  }, []);
  function getAds(url: string) {
    axios
      .get(url)
      .then((res) => {
        setAdArr(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  function getTowns(url: string) {
    axios
      .get(url)
      .then((res) => {
        setTownArr(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  function getCats(url: string) {
    axios
      .get(url)
      .then((res) => {
        setCatsArr(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  return (
    <div className='grid grid-cols-4 container gap-5 mt-5'>
      <div>
        <ul className='border border-black rounded-md overflow-hidden'>
          <li className='bg-slate-200 pl-2'>Miestai</li>
          {townArr.map((item: TownObjType) => (
            <li key={item.id} className='pl-2'>
              {item.name}
            </li>
          ))}
        </ul>
        <ul></ul>
      </div>
      <ul className='grid grid-cols-3 col-span-3'>
        {adArr.map((item: AdsObjType) => (
          <li>
            <SingleAd key={item.id} item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
