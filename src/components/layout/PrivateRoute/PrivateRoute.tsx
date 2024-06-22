import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import cl from './PrivateRoute.module.scss';
import { Suspense, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Sidebar } from '../Sidebar/Sidebar';
import { Footer } from '../Footer/Footer';

interface Props {}

export const PrivateRoute: React.FC<Props> = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const location = useLocation();

   return isAuth ? (
      <Outlet />
   ) : (
      <Navigate to="/about" state={{ from: location }} replace />
   );
};
