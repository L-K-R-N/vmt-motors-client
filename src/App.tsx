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
import { useLayoutEffect, useState } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import {
   setLang,
   setTheme,
   TLanguage,
   TTheme,
} from './store/reducers/SettingsSlice';
import { ChatsPage } from './pages/other/ChatsPage';
import axios from 'axios';

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
      path: 'vmt-motors-client/chats',
      element: <ChatsPage />,
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
   const [countryCode, setCountryCode] = useState<string | null>(null);
   // const navigate = useNavigate();
   // useEffect(() => {
   //    setIsAuth();
   // }, []);
   async function getCountry() {
      const res = await axios.get<{ countryCode: string }>(
         'http://ip-api.com/json',
      );
      console.log(res, res.status === 200, res.data?.countryCode);
      if (res.status === 200) {
         return res.data?.countryCode;
      }
   }

   const changeStartLang = (countryCode: Promise<string | undefined>) => {
      let newLang: TLanguage = 'en';
      let code: string | undefined = 'EN';
      countryCode.then((res) => {
         code = res;
         console.log(res, code);
      });

      console.log(code);

      switch (code) {
         case 'RU':
            newLang = 'ru';
            break;
         case 'KR':
            newLang = 'ko';
            break;
         case 'BY':
            newLang = 'be';
            break;
         case 'KZ':
            newLang = 'kk';
            break;
         case 'CN':
            newLang = 'zh';
            break;
         case 'UA':
            newLang = 'uk';
            break;
      }

      return newLang;
   };

   useLayoutEffect(() => {
      console.log(isAuth);
      const lastTheme = localStorage.getItem('theme');
      dispatch(setTheme(lastTheme ? (lastTheme as TTheme) : 'dark'));
      localStorage.setItem('theme', lastTheme ? lastTheme : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
      console.log(getCountry());
      dispatch(setLang(changeStartLang(getCountry())));
      console.log(countryCode);
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
