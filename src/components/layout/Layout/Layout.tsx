import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import cl from './Layout.module.scss';
import { Suspense } from 'react';
import { Header } from '../Header/Header';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Sidebar } from '../Sidebar/Sidebar';
import { Footer } from '../Footer/Footer';

interface Props {}

export const Layout: React.FC<Props> = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { isAdmin } = useAppSelector((state) => state.UserReducer);
   const location = useLocation();

   const navigate = useNavigate();

   // useEffect(() => {
   //    navigate(isAuth ? '/about' : '/signin');
   // }, [isAuth]);

   return (
      <>
         <Header />
         <main className={cl.main}>
            <Suspense fallback={<Loader />}>
               <Sidebar />
               {/* {isAuth ? ( */}
               <Outlet />
               {/* // ) : (
               //    <Navigate to="/signin" state={{ from: location }} replace />
               // )} */}
            </Suspense>
         </main>
         <Footer />
      </>
   );
};
