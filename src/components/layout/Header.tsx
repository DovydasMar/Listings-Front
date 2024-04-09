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
          <ul className='grid gap-4 absolute bg-red-300 top-20 right-0 z-10 p-10'>
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
        )}
      </div>
    </header>
  );
}
