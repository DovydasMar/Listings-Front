import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import { AdsObjType } from '../../util/types';
import Button from './Button';

type SingleAdProps = {
  item: AdsObjType;
};
export default function SingleAd({ item }: SingleAdProps) {
  const { userId } = useAuthCtx();
  return (
    <div
      className={`border border-black rounded-md p-2 ${
        userId === item.user_id ? 'bg-slate-300' : ''
      }`}
    >
      <img className='object-cover' src={item.main_img_url} alt={item.title} />
      <h4>{item.title}</h4>
      <p>{item.town}</p>
      <p>{item.price}</p>
      <Link to={`/listing/${item.id}`}>
        <Button>Plačiau</Button>
      </Link>
    </div>
  );
}
