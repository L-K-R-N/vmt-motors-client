import { Outlet, useNavigate } from 'react-router-dom';
import cl from './Layout.module.scss';
import { Suspense, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Sidebar } from '../Sidebar/Sidebar';

interface Props {}

export const Layout: React.FC<Props> = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const navigate = useNavigate();
   useEffect(() => {
      navigate(isAuth ? '/main' : '/signin');
   }, []);
   return (
      <>
         <Header />
         <main className={cl.main}>
            <Suspense fallback={<Loader />}>
               <Sidebar />
               <Outlet />
            </Suspense>
         </main>
      </>
   );
};
