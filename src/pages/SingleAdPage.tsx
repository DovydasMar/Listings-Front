import axios from 'axios';
import { useEffect, useState } from 'react';
import { adsUrl } from '../config';
import { useParams } from 'react-router-dom';

export default function SingleAdPage() {
  const [adObj, setAdObj] = useState({});
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
  return <div></div>;
}
