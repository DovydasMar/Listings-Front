import { CategoryObjType } from '../../util/types';

type CategoriesProps = {
  item: CategoryObjType;
};
export default function Categories({ item }: CategoriesProps) {
  return <li className=''>categorija</li>;
}
