import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='h-20 bg-slate-300 flex justify-between items-center px-20'>
      <h6 className='text-2xl'>logo</h6>
      <ul className='flex gap-4'>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/towns'}>Towns</NavLink>
        </li>
      </ul>
    </header>
  );
}
