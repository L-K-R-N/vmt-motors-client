import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import cl from './AdminRoute.module.scss';
import { Suspense, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Sidebar } from '../Sidebar/Sidebar';
import { Footer } from '../Footer/Footer';

interface Props {}

export const AdminRoute: React.FC<Props> = () => {
   const { isAdmin } = useAppSelector((state) => state.UserReducer);
   const location = useLocation();

   return isAdmin ? (
      <Outlet />
   ) : (
      <Navigate to="/about" state={{ from: location }} replace />
   );
};
