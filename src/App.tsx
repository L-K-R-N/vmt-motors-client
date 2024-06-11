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
import { CatalogPage } from './pages/other/CatalogPage';
import { ProductPage } from './pages/other/ProductPage';
import { AddAdvertPage } from './pages/other/AddAdvertPage';
import { UsersListPage } from './pages/admin/UsersListPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { useLayoutEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setTheme, TTheme } from './store/reducers/SettingsSlice';

// const authRoutes: RouteObject[] = [];

const routes: RouteObject[] = [
   {
      path: 'vmt-motors-client/signup',
      element: <RegisterPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return !isAuth;
      },
   },
   {
      path: 'vmt-motors-client/signin',
      element: <LoginPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return !isAuth;
      },
   },
   {
      path: 'vmt-motors-client/adverts',
      element: <CatalogPage />,
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
      path: 'vmt-motors-client/about',
      element: <MainPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },

   {
      path: 'vmt-motors-client/profile',
      element: <ProfilePage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },

   {
      path: 'vmt-motors-client/adverts/buy/:id',
      element: <ProductPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },
   {
      path: 'vmt-motors-client/add',
      element: <AddAdvertPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         return isAuth;
      },
   },
   {
      path: 'vmt-motors-client/admin/users-list',
      element: <UsersListPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         // const [isAdmin, setIsAdmin] = useState(true)
         return isAuth && true;
      },
   },
   {
      path: 'vmt-motors-client/admin/dashboard',
      element: <DashboardPage />,
      loader: () => {
         const isAuth = localStorage.getItem('isAuth');
         // const [isAdmin, setIsAdmin] = useState(true)
         return isAuth && true;
      },
   },
];

const App = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const dispatch = useAppDispatch();
   const { theme } = useAppSelector((state) => state.SettingsReducer);
   // const navigate = useNavigate();
   // useEffect(() => {
   //    setIsAuth();
   // }, []);

   useLayoutEffect(() => {
      console.log(isAuth);
      const lastTheme = localStorage.getItem('theme');
      dispatch(setTheme(lastTheme ? (lastTheme as TTheme) : 'dark'));
      localStorage.setItem('theme', lastTheme ? lastTheme : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
   }, []);

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
