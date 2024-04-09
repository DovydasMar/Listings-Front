import { Link, NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import { useState } from 'react';

export default function Header() {
  const { isUserLoggedIn, logout, email } = useAuthCtx();
  const [opened, setOpened] = useState(false);

  return (
    <header className='h-20 bg-slate-300'>
      <div className='flex h-full justify-between items-center container header-sizing'>
        <Link to={'/'}>
          <h6 className='text-2xl'>logo</h6>
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
              <NavLink to={'/listing/add'}>prideti skelbima</NavLink>
            </li>
          )}

          {!isUserLoggedIn && (
            <li>
              <NavLink to={'/login'}>prisijungti</NavLink>
            </li>
          )}
          {!isUserLoggedIn && (
            <li>
              <NavLink to={'/register'}>registruotis</NavLink>
            </li>
          )}

          {isUserLoggedIn ? (
            <li>
              <NavLink to={'/user'}>mano paskyra</NavLink>
            </li>
          ) : (
            ''
          )}
          {isUserLoggedIn ? (
            <li>
              <button onClick={logout}>atsijungti</button>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
      <div className='h-full justify-between items-center container small-header-sizing'>
        <Link to={'/'}>
          <h6 className='text-2xl'>logo</h6>
        </Link>
        {email ? <h5 className='text-xl'>{email}</h5> : ''}
        <button onClick={() => setOpened(!opened)}>
          {opened ? (
            <i className='bi bi-x-lg text-black'></i>
          ) : (
            <i className='bi bi-list text-black'></i>
          )}
        </button>
        {opened && (
          <div
            className='absolute z-10 top-0 bottom-0 left-0 right-0 bg-slate-600 opacity-15'
            onClick={() => setOpened(!opened)}
          ></div>
        )}
        {opened && (
          <ul
            className={`flex flex-col gap-5 absolute bg-slate-300 top-20 h-full md:w-1/3 sm:w-1/2 right-0 z-20 p-10`}
          >
            <li className='h-5' onClick={() => setOpened(!opened)}>
              <NavLink to={'/'}>Pagrindinis</NavLink>
            </li>
            <li>
              <NavLink to={'/towns'}>Miestai</NavLink>
            </li>

            {isUserLoggedIn && (
              <li>
                <NavLink to={'/listing/add'}>prideti skelbima</NavLink>
              </li>
            )}

            {!isUserLoggedIn && (
              <li>
                <NavLink to={'/login'}>prisijungti</NavLink>
              </li>
            )}
            {!isUserLoggedIn && (
              <li>
                <NavLink to={'/register'}>registruotis</NavLink>
              </li>
            )}

            {isUserLoggedIn ? (
              <li>
                <NavLink to={'/user'}>mano paskyra</NavLink>
              </li>
            ) : (
              ''
            )}
            {isUserLoggedIn ? (
              <li>
                <button onClick={logout}>atsijungti</button>
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
