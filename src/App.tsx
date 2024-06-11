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
import { UsersListPage } from './pages/admin/UsersListPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { useEffect, useState } from 'react';

// const authRoutes: RouteObject[] = [];

const userRoutes: RouteObject[] = [
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

const adminRoutes: RouteObject[] = [
   {
      path: 'adverts',
      element: <CatalogPage />,
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

   {
      path: 'profile',
      element: <ProfilePage />,
   },

   {
      path: 'adverts/buy/:id',
      element: <ProductPage />,
   },
   {
      path: 'add',
      element: <AddAdvertPage />,
   },
   {
      path: 'users-list',
      element: <UsersListPage />,
   },
   {
      path: 'dashboard',
      element: <DashboardPage />,
   },
];

const unAuthRoutes: RouteObject[] = [
   {
      path: 'signup',
      element: <RegisterPage />,
   },
   {
      path: 'signin',
      element: <LoginPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },
];

const routes: RouteObject[] = [
   {
      path: 'signup',
      element: <RegisterPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return !isAuth;
      },
   },
   {
      path: 'signin',
      element: <LoginPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return !isAuth;
      },
   },
   {
      path: 'adverts',
      element: <CatalogPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },
   {
      path: 'recover',
      element: <ForgotPassPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },
   // {
   //    path: 'loader',
   //    element: <Loader />,
   // },
   {
      path: 'about',
      element: <MainPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },

   {
      path: 'profile',
      element: <ProfilePage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },

   {
      path: 'adverts/buy/:id',
      element: <ProductPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },
   {
      path: 'add',
      element: <AddAdvertPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },
   {
      path: 'admin/users-list',
      element: <UsersListPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         // const [isAdmin, setIsAdmin] = useState(true)
         return isAuth && true;
      },
   },
   {
      path: 'admin/dashboard',
      element: <DashboardPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         // const [isAdmin, setIsAdmin] = useState(true)
         return isAuth && true;
      },
   },
];

const App = () => {
   // const navigate = useNavigate();
   // useEffect(() => {
   //    setIsAuth();
   // }, []);
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const [isAdmin, setIsAdmin] = useState(false);
   useEffect(() => {
      console.log(isAuth);
   }, [isAuth]);

   const router = createBrowserRouter([
      {
         path: '/',
         element: <Layout />,
         errorElement: <ErrorPage />,
         // children: isAuth ? authRoutes : unAuthRoutes,
         children: routes,
      },
   ]);
   return <RouterProvider router={router} />;
};

export default App;
