import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import { useState } from 'react';

export default function Header() {
  const { isUserLoggedIn, logout, email } = useAuthCtx();

  return (
    <header className='h-20 bg-slate-300 '>
      <div className='flex h-full justify-between items-center container'>
        <h6 className='text-2xl'>logo</h6>
        {email ? <h5 className='text-xl'>{email}</h5> : ''}
        <ul className='flex gap-4'>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/towns'}>Towns</NavLink>
          </li>
          {!isUserLoggedIn ? (
            <li>
              <NavLink to={'/login'}>Login</NavLink>
            </li>
          ) : (
            ''
          )}
          {isUserLoggedIn ? (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </header>
  );
}
