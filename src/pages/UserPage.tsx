import { useEffect, useState } from 'react';
import { useAuthCtx } from '../store/AuthProvider';
import axios from 'axios';
import { userUrl } from '../config';
import UpdateForm from '../components/UI/UpdateForm';
import Button from '../components/UI/Button';

export default function UserPage() {
  const { email, userId } = useAuthCtx();

  const [updateForm, setUpdateForm] = useState(false);
  const [userFromBe, setUserFromBe] = useState({
    id: '',
    email: '',
    name: '',
    created_at: '',
    avatar_url: '',
  });
  console.log('userFromBe ===', userFromBe);
  useEffect(() => {
    getUserData(`${userUrl}/${userId}`);
  }, [userId]);
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

  return (
    <div>
      <div className='container mt-2'>
        <div className='grid grid-cols-2'>
          <div>
            <h1 className='display-2'>UserPage: {email} </h1>
            <p>Welcome to Your homepage UserPage</p>
            <p className='h4 fw-normal'>
              Username: <span className='font-semibold'>{userFromBe.name}</span>
            </p>
          </div>
          <Button onClick={() => setUpdateForm(!updateForm)}>
            {updateForm ? 'uzdaryti forma' : 'atnaujinti vartotojo info'}
          </Button>
        </div>
        {updateForm && <UpdateForm email={email} name={userFromBe.name} userId={userId} />}
      </div>
    </div>
  );
}
