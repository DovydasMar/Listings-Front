import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import UnknownPage from './pages/UnknownPage';
import SingleAdPage from './pages/SingleAdPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AddNewAdPage from './pages/AddNewAdPage';
import TownsPage from './pages/TownsPage';
import SingleTownPage from './pages/SingleTownPage';
import { useAuthCtx } from './store/AuthProvider';

function App() {
  const { isUserLoggedIn } = useAuthCtx();
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/skelbimas/sukurti' element={<AddNewAdPage />} />
        <Route path='/skelbimas/:id' element={<SingleAdPage />} />
        <Route path='/login' element={!isUserLoggedIn ? <Login /> : <Navigate to={'/'} />} />
        <Route path='/register' element={isUserLoggedIn ? <Navigate to={'/'} /> : <Register />} />
        <Route path='/towns' element={<TownsPage />} />
        <Route path='/towns/:id' element={<SingleTownPage />} />
        <Route path='*' element={<UnknownPage />} />
      </Routes>
    </div>
  );
}

export default App;
