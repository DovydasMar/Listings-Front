import { CategoryObjType, TownObjType } from '../../util/types';

type filterBoxType = {
  towns: TownObjType[];
  categories: CategoryObjType[];
};
export default function FilterBox({ towns, categories }: filterBoxType) {
  return (
    <div>
      <ul className='border border-black rounded-md overflow-hidden mb-3'>
        <li className='bg-slate-200 pl-2'>Miestai</li>
        {towns.map((item: TownObjType) => (
          <li key={item.id} className='pl-2'>
            {item.name}
          </li>
        ))}
      </ul>
      <ul className='border border-black rounded-md overflow-hidden mb-3'>
        <li className='bg-slate-200 pl-2'>Kategorijos</li>
        {categories.map((item: CategoryObjType) => (
          <li key={item.id} className='pl-2'>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
