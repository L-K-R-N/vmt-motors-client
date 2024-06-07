import {
   createBrowserRouter,
   RouteObject,
   RouterProvider,
} from 'react-router-dom';
import './styles/main.scss';

import { Layout } from './components/layout/Layout/Layout';
import { useAppSelector } from './hooks/useAppSelector';
import { MainPage } from './pages/other/MainPage';

import { ProfilePage } from './pages/other/ProfilePage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ErrorPage } from './pages/error/ErrorPage/ErrorPage';
import { ForgotPassPage } from './pages/auth/ForgotPassPage';
import { Loader } from './components/UI/Loader/Loader';
import { AdsPage } from './pages/other/AdsPage';
import { AboutPage } from './pages/other/AboutPage';
import { CatalogPage } from './pages/other/CatalogPage';
import { FaqPage } from './pages/other/FaqPage';
import { ProductPage } from './pages/other/ProductPage';
import { AddAdvertPage } from './pages/other/AddAdvertPage';

// const authRoutes: RouteObject[] = [];

const unAuthRoutes: RouteObject[] = [
   {
      path: 'signup',
      element: <RegisterPage />,
   },
   {
      path: 'signin',
      element: <LoginPage />,
   },
   {
      path: 'ads',
      element: <AdsPage />,
   },
   {
      path: 'recover',
      element: <ForgotPassPage />,
   },
   // {
   //    path: 'loader',
   //    element: <Loader />,
   // },
   {
      path: 'main',
      element: <MainPage />,
   },

   {
      path: 'about',
      element: <AboutPage />,
   },

   // {
   //    path: 'notifications',
   //    element: <ImportantsPage />,
   // },
   // {
   //    path: 'rules',
   //    element: <ImportantsPage />,
   // },
   {
      path: 'profile',
      element: <ProfilePage />,
   },
   // {
   //    path: 'news',
   //    element: <NewsPage />,
   // },
   {
      path: 'catalog',
      element: <CatalogPage />,
   },
   {
      path: 'faq',
      element: <FaqPage />,
   },
   {
      path: 'loader',
      element: <Loader />,
   },
   {
      path: 'catalog/buy/:id',
      element: <ProductPage />,
   },
   {
      path: 'add',
      element: <AddAdvertPage />,
   },
];

const router = () =>
   createBrowserRouter([
      {
         path: '/',
         element: <Layout />,
         errorElement: <ErrorPage />,
         // children: isAuth ? authRoutes : unAuthRoutes,
         children: unAuthRoutes,
      },
   ]);

const App = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   // const navigate = useNavigate();
   // useEffect(() => {
   //    setIsAuth();
   // }, []);
   return <RouterProvider router={router()} />;
};

export default App;
