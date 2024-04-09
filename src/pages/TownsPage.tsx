import axios from 'axios';
import { useEffect, useState } from 'react';
import { townUrl } from '../config';
import { TownObjType } from '../util/types';
import SingleTownDiv from '../components/UI/SingleTownDiv';

export default function TownsPage() {
  const [townsArr, setTownsArr] = useState([]);
  console.log('townsArr ===', townsArr);

  useEffect(() => {
    getCountries();
  }, []);
  function getCountries() {
    axios
      .get(townUrl)
      .then((res) => {
        setTownsArr(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  return (
    <div className='container'>
      <h3 className='text-2xl'>Miestai</h3>
      <ul className='grid grid-cols-3 gap-3'>
        {townsArr.map((town: TownObjType) => (
          <li key={town.id}>
            <SingleTownDiv item={town} />
          </li>
        ))}
      </ul>
    </div>
  );
}
