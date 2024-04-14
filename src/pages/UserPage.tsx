import { useEffect, useState } from 'react';
import { useAuthCtx } from '../store/AuthProvider';
import axios from 'axios';
import { adsUrl, userUrl } from '../config';
import UpdateForm from '../components/UI/UpdateForm';
import Button from '../components/UI/Button';
import { AdsObjType } from '../util/types';
import SingleAd from '../components/UI/SingleAd';

export default function UserPage() {
  const { email, userId } = useAuthCtx();

  const [updateForm, setUpdateForm] = useState(false);
  const [adsArr, setAdsArr] = useState<AdsObjType[] | null>(null);
  const [needToReset, setNeedToReset] = useState(false);
  const [userFromBe, setUserFromBe] = useState({
    id: '',
    email: '',
    name: '',
    created_at: '',
    avatar_url: '',
  });
  useEffect(() => {
    getUserData(`${userUrl}/${userId}`);
    getAds(`${adsUrl}/user/${userId}`);
  }, [userId, needToReset]);

  function getUserData(url: string) {
    axios
      .get(url)
      .then((res) => {
        console.log('res.data ===', res.data);
        setUserFromBe(res.data);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }
  function getAds(url: string) {
    axios
      .get(url)
      .then((res) => {
        console.log('res.data ===', res.data);
        setAdsArr(res.data);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }

  return (
    <div className='container mt-2'>
      <div className='grid grid-cols-3'>
        <div>
          <h1 className='display-2'>Vartotojo puslapis: {email} </h1>
          <p className='h4 fw-normal'>
            Username: <span className='font-semibold'>{userFromBe.name}</span>
          </p>
        </div>
        <img
          className='rounded-full w-16 h-16 object-cover'
          src={userFromBe.avatar_url}
          alt={userFromBe.name}
        />

        <Button onClick={() => setUpdateForm(!updateForm)}>
          {updateForm ? 'uzdaryti forma' : 'atnaujinti vartotojo info'}
        </Button>
      </div>
      {updateForm && <UpdateForm email={email} name={userFromBe.name} userId={userId} />}
      {!updateForm && (
        <div className='mt-5 grid gap-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 '>
          {adsArr?.map((ad: AdsObjType) => (
            <SingleAd
              reset={() => {
                setNeedToReset(!needToReset);
              }}
              item={ad}
              key={ad.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
