import { CategoryObjType, TownObjType } from '../../util/types';

type FilterBoxProps = {
  towns: TownObjType[];
  categories: CategoryObjType[];
  onClickTown: (townName: string) => void;
  onClickCategory: (categoryName: string) => void;
  townVal?: string;
  categoryVal?: string;
};

export default function FilterBox({
  towns,
  categories,
  onClickCategory,
  onClickTown,
  categoryVal,
  townVal,
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
        <li className='bg-[#37514D] pl-2 text-[#EEE6DE]'>Miestai</li>
        <li className='pl-2 border-b cursor-pointer' onClick={() => handleTownClick('')}>
          Rodyti visus
        </li>
        {towns.map((item: TownObjType) => (
          <li
            key={item.id}
            className={`pl-2 border-b cursor-pointer ${townVal === item.name && 'bg-[#a8b5c0] '}`}
            onClick={() => handleTownClick(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <ul className='border border-black rounded-md overflow-hidden mb-3'>
        <li className='bg-[#37514D] pl-2 text-[#EEE6DE]'>Kategorijos</li>
        <li className={`pl-2 border-b cursor-pointer `} onClick={() => handleCategoryClick('')}>
          Rodyti visus
        </li>
        {categories.map((item: CategoryObjType) => (
          <li
            key={item.id}
            className={`pl-2 border-b cursor-pointer ${
              categoryVal === item.name && 'bg-[#a8b5c0]'
            }`}
            onClick={() => handleCategoryClick(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
