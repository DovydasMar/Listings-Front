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
  const [townVal, setTownVal] = useState('');
  const [categoryVal, setCategoryVal] = useState('');
  const [needToReset, setNeedToReset] = useState(false);
  //  console.log('categoryVal ===', categoryVal);
  //  console.log('townVal ===', townVal);
  //  console.log('adArr ===', adArr);
  //  console.log('townArr ===', townArr);
  // console.log('catsArr ===', catsArr);

  let filteredAds;
  if (townVal) {
    filteredAds = adArr.filter((ad: AdsObjType) => ad.town === townVal);
  } else if (categoryVal) {
    filteredAds = adArr.filter((ad: AdsObjType) => ad.category === categoryVal);
  } else {
    filteredAds = adArr;
  }

  useEffect(() => {
    getAds(adsUrl);
    getTowns(townUrl);
    getCats(catsUrl);
  }, [needToReset]);

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
    <div className='container'>
      <h1 className='text-3xl mt-4 text-center font-bold'>Sveiki atvykę į Skelbimų pasaulį</h1>
      <div className='grid mb-4 sm:grid-cols-3 md:grid-cols-4  gap-5 mt-5'>
        <FilterBox
          towns={townArr}
          categories={catsArr}
          onClickTown={setTownVal}
          onClickCategory={setCategoryVal}
          townVal={townVal}
          categoryVal={categoryVal}
        />
        <ul className='grid gap-2 sm:grid-cols-2 sm:col-span-2 md:grid-cols-3 md:col-span-3'>
          {filteredAds.map((item: AdsObjType) => (
            <li key={item.id}>
              <SingleAd
                reset={() => {
                  setNeedToReset(!needToReset);
                }}
                key={item.id}
                item={item}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
