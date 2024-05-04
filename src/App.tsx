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
import UserPage from './pages/UserPage';
import Footer from './components/layout/Footer';

function App() {
  const { isUserLoggedIn } = useAuthCtx();
  console.log('isUserLoggedIn ===', isUserLoggedIn);
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-grow'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/listing/add'
            element={isUserLoggedIn ? <AddNewAdPage /> : <Navigate to={'/'} />}
          />
          <Route path='/listing/:ad_id' element={<SingleAdPage />} />
          <Route path='/login' element={!isUserLoggedIn ? <Login /> : <Navigate to={'/'} />} />
          <Route path='/register' element={isUserLoggedIn ? <Navigate to={'/'} /> : <Register />} />
          <Route path='/towns' element={<TownsPage />} />
          <Route path='/towns/:town_id' element={<SingleTownPage />} />
          <Route path='/user' element={isUserLoggedIn ? <UserPage /> : <Navigate to={'/'} />} />
          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
