import {
   createBrowserRouter,
   RouteObject,
   RouterProvider,
} from 'react-router-dom';
import './styles/main.scss';

import { Layout } from './components/layout/Layout/Layout';
import { useAppSelector } from './hooks/useAppSelector';
import { OrdersPage } from './pages/other/OrdersPage';
import { MainPage } from './pages/other/MainPage';

import { ProfilePage } from './pages/other/ProfilePage';
import { HomePage } from './pages/other/HomePage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ErrorPage } from './pages/error/ErrorPage/ErrorPage';
import { ForgotPassPage } from './pages/auth/ForgotPassPage';
import { CartPage } from './pages/other/CartPage';
import { Loader } from './components/UI/Loader/Loader';
import { RouteIdPage } from './pages/other/RouteIdPage';

// const authRoutes: RouteObject[] = [];

const unAuthRoutes: RouteObject[] = [
   {
      path: 'home',
      element: <HomePage />,
   },

   {
      path: 'signup',
      element: <RegisterPage />,
   },
   {
      path: 'signin',
      element: <LoginPage />,
   },
   {
      path: 'recover',
      element: <ForgotPassPage />,
   },
   {
      path: 'loader',
      element: <Loader />,
   },
   {
      path: 'main',
      element: <MainPage />,
   },

   {
      path: 'orders',
      element: <OrdersPage />,
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
      path: 'cart',
      element: <CartPage />,
   },
   {
      path: 'home',
      element: <HomePage />,
   },
   {
      path: 'loader',
      element: <Loader />,
   },
   {
      path: 'routes/:id',
      element: <RouteIdPage />,
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
