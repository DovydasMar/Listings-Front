import { AdsObjType } from '../../util/types';

type SingleAdProps = {
  item: AdsObjType;
};
export default function SingleAd({ item }: SingleAdProps) {
  return (
    <div className='border border-black rounded-md'>
      <h1>{item.title}</h1>
    </div>
  );
}
