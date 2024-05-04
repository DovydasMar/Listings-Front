import { Link, NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import { useState } from 'react';

export default function Header() {
  const { isUserLoggedIn, logout, email } = useAuthCtx();
  const [opened, setOpened] = useState(false);

  return (
    <header className='h-20 bg-[#37514D]'>
      <div className='flex h-full justify-between items-center container header-sizing text-[#EEE6DE]'>
        <Link to={'/'}>
          <img className='w-20' src='/img/logotipas.png' alt='skelbimų pasaulis' />
        </Link>
        {email ? <h5 className='text-xl'>{email}</h5> : ''}

        <ul className='flex gap-4  '>
          <li>
            <NavLink to={'/'}>Pagrindinis</NavLink>
          </li>
          <li>
            <NavLink to={'/towns'}>Miestai</NavLink>
          </li>

          {isUserLoggedIn && (
            <li>
              <NavLink to={'/listing/add'}>Prideti skelbima</NavLink>
            </li>
          )}

          {!isUserLoggedIn && (
            <li>
              <NavLink to={'/login'}>Prisijungti</NavLink>
            </li>
          )}
          {!isUserLoggedIn && (
            <li>
              <NavLink to={'/register'}>Registruotis</NavLink>
            </li>
          )}

          {isUserLoggedIn ? (
            <li>
              <NavLink to={'/user'}>Mano paskyra</NavLink>
            </li>
          ) : (
            ''
          )}
          {isUserLoggedIn ? (
            <li>
              <button onClick={logout}>Atsijungti</button>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
      <div className='h-full justify-between items-center container small-header-sizing'>
        <Link to={'/'}>
          <img className='w-20' src='/img/logotipas.png' alt='skelbimų pasaulis' />
        </Link>
        {email ? <h5 className='text-xl text-[#EEE6DE]'>{email}</h5> : ''}
        <button onClick={() => setOpened(!opened)}>
          {opened ? (
            <i className='bi bi-x-lg text-[#EEE6DE]'></i>
          ) : (
            <i className='bi bi-list text-[#EEE6DE]'></i>
          )}
        </button>
        {opened && (
          <div
            className='absolute z-10 top-0 bottom-0 left-0 right-0 text-[#EEE6DE] opacity-15'
            onClick={() => setOpened(!opened)}
          ></div>
        )}
        {opened && (
          <ul
            className={`flex flex-col gap-5 absolute bg-[#37514D] text-[#EEE6DE] top-20 h-full md:w-1/3 sm:w-1/2 right-0 z-20 p-10`}
          >
            <li className='h-5' onClick={() => setOpened(!opened)}>
              <NavLink to={'/'}>Pagrindinis</NavLink>
            </li>
            <li onClick={() => setOpened(!opened)}>
              <NavLink to={'/towns'}>Miestai</NavLink>
            </li>

            {isUserLoggedIn && (
              <li onClick={() => setOpened(!opened)}>
                <NavLink to={'/listing/add'}>Prideti skelbima</NavLink>
              </li>
            )}

            {!isUserLoggedIn && (
              <li onClick={() => setOpened(!opened)}>
                <NavLink to={'/login'}>Prisijungti</NavLink>
              </li>
            )}
            {!isUserLoggedIn && (
              <li onClick={() => setOpened(!opened)}>
                <NavLink to={'/register'}>Registruotis</NavLink>
              </li>
            )}

            {isUserLoggedIn ? (
              <li onClick={() => setOpened(!opened)}>
                <NavLink to={'/user'}>Mano paskyra</NavLink>
              </li>
            ) : (
              ''
            )}
            {isUserLoggedIn ? (
              <li onClick={() => setOpened(!opened)}>
                <button onClick={logout}>Atsijungti</button>
              </li>
            ) : (
              ''
            )}
          </ul>
        )}
      </div>
    </header>
  );
}
