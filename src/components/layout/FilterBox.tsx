import { CategoryObjType, TownObjType } from '../../util/types';

type FilterBoxProps = {
  towns: TownObjType[];
  categories: CategoryObjType[];
  onClickTown: (townName: string) => void;
  onClickCategory: (categoryName: string) => void;
};

export default function FilterBox({
  towns,
  categories,
  onClickCategory,
  onClickTown,
}: FilterBoxProps) {
  const handleTownClick = (townName: string) => {
    onClickTown(townName);
    onClickCategory('');
  };

  function handleCategoryClick(categoryName: string) {
    onClickCategory(categoryName);
    onClickTown('');
  }

  return (
    <div>
      <ul className='border border-black rounded-md overflow-hidden mb-3'>
        <li className='bg-slate-200 pl-2'>Miestai</li>
        <li className='pl-2' onClick={() => handleTownClick('')}>
          rodyti visus
        </li>
        {towns.map((item: TownObjType) => (
          <li key={item.id} className='pl-2' onClick={() => handleTownClick(item.name)}>
            {item.name}
          </li>
        ))}
      </ul>
      <ul className='border border-black rounded-md overflow-hidden mb-3'>
        <li className='bg-slate-200 pl-2'>Kategorijos</li>
        <li className='pl-2' onClick={() => handleCategoryClick('')}>
          rodyti visus
        </li>
        {categories.map((item: CategoryObjType) => (
          <li key={item.id} className='pl-2' onClick={() => handleCategoryClick(item.name)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
