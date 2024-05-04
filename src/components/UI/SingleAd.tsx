import { Link, useNavigate } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import { AdsObjType } from '../../util/types';
import Button from './Button';
import axios from 'axios';
import { adsUrl } from '../../config';

type SingleAdProps = {
  item: AdsObjType;
  reset: () => void;
};
export default function SingleAd({ item, reset }: SingleAdProps) {
  const { userId } = useAuthCtx();
  //  const navigate = useNavigate();

  function deleteAd(id: number | undefined) {
    axios
      .delete(`${adsUrl}/${id}`)
      .then((res) => {
        console.log('res ===', res);
        reset();
      })
      .catch((err) => {
        console.warn('err ===', err);
      });
  }
  return (
    <div className={`border border-slate-300 rounded-lg p-2  `}>
      <Link to={`/listing/${item.id}`}>
        <img
          className='object-cover w-full h-40 rounded-sm'
          src={item.main_img_url}
          alt={item.title}
        />
      </Link>
      <h4 className='font-bold'>{item.title}</h4>
      <p>
        <button className=' rounded-xl px-1 bg-[#ff9540] text-[#374b5c]'>
          <i className='bi bi-geo-alt-fill '></i>
        </button>{' '}
        {item.town}
      </p>
      <p className='font-semibold'>€ {item.price}</p>
      <div className='grid grid-cols-2 gap-2'>
        <Link to={`/listing/${item.id}`}>
          <Button>Skaityti plačiau</Button>
        </Link>
        {userId === item.user_id && (
          <Button danger onClick={() => deleteAd(item.id)}>
            Ištrinti
          </Button>
        )}
      </div>
    </div>
  );
}
