import { Link } from 'react-router-dom';
import { TownObjType } from '../../util/types';
import Button from './Button';

type SingleTownProps = {
  item: TownObjType;
};
export default function SingleTownDiv({ item }: SingleTownProps) {
  return (
    <div className='border border-black rounded-md p-4'>
      <img className='rounded-md object-cover w-full h-56' src={item.img_url} alt={item.name} />
      <h4 className='text-xl font-semibold'>{item.name}</h4>
      <p>
        Skelbimu kiekis: <span className='font-bold'>{item.kiekis}</span>
      </p>
      <Link to={`/towns/${item.id}`} className='block mt-2'>
        <Button>Plačiau</Button>
      </Link>
    </div>
  );
}
