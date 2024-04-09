import { useEffect, useState } from 'react';
import { adsUrl, catsUrl, townUrl } from '../config';
import axios from 'axios';
import SingleAd from '../components/UI/SingleAd';
import { AdsObjType } from '../util/types';
import FilterBox from '../components/layout/FilterBox';

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
    <div className='grid sm:grid-cols-2 md:grid-cols-4 container gap-5 mt-5'>
      <FilterBox towns={townArr} categories={catsArr} />
      <ul className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 md:col-span-3'>
        {adArr.map((item: AdsObjType) => (
          <li key={item.id}>
            <SingleAd key={item.id} item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
