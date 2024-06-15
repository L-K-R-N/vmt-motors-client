import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom';
import './styles/main.scss';

import { Layout } from './components/layout/Layout/Layout';
import { useAppSelector } from './hooks/useAppSelector';
import { MainPage } from './pages/other/MainPage';

import { ProfilePage } from './pages/other/ProfilePage';
import RegisterPage from './pages/auth/RegisterPage/RegisterPage';
import LoginPage from './pages/auth/LoginPage/LoginPage';
import { CatalogPage } from './pages/other/CatalogPage';
import { ProductPage } from './pages/other/ProductPage';
import { AddAdvertPage } from './pages/other/AddAdvertPage';
import { UsersListPage } from './pages/admin/UsersListPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import {
   setLang,
   setTheme,
   TLanguage,
   TTheme,
} from './store/reducers/SettingsSlice';
import { ChatsPage } from './pages/other/ChatsPage';
import axios from 'axios';
import {
   getBrowserAndOS,
   IRefreshInputs,
   setIsAuth,
} from './store/reducers/AuthSlice';
import PersonService from './api/services/PersonService';
import { setMe } from './store/reducers/UserSlice';
import { AuthResponse } from './api/models/response/AuthResponse';
import { BASE_URL } from './api/app.vars';

// const authRoutes: RouteObject[] = [];

const App = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const dispatch = useAppDispatch();
   const { theme } = useAppSelector((state) => state.SettingsReducer);
   const [countryCode, setCountryCode] = useState<string | null>(null);
   const [unAuthRoutes, setUnAuthRoutes] = useState<RouteObject[]>([
      {
         path: '/signup',
         element: <RegisterPage />,
         // loader: () => !isAuth,
      },
      {
         path: '/signin',
         element: <LoginPage />,
         // loader: () => !isAuth,
      },
   ]);

   const [authRoutes, setAuthRoutes] = useState<RouteObject[]>([
      {
         path: '/adverts',
         element: <CatalogPage />,
         // loader: () => isAuth,
      },

      // {
      //    path: 'loader',
      //    element: <Loader />,
      // },
      {
         path: '/about',
         element: <MainPage />,
         // loader: () => isAuth,
      },

      {
         path: '/profile',
         element: <ProfilePage />,
         // loader: () => isAuth,
      },

      {
         path: '/adverts/buy/:id',
         element: <ProductPage />,
         // loader: () => isAuth,
      },
      {
         path: '/add',
         element: <AddAdvertPage />,
         // loader: () => isAuth,
      },
      {
         path: '/chats',
         element: <ChatsPage />,
         // loader: () => isAuth,
      },
      {
         path: '/admin/users-list',
         element: <UsersListPage />,
         loader: () => isAuth && true,
      },
      {
         path: '/admin/dashboard',
         element: <DashboardPage />,
         loader: () => isAuth && true,
      },
   ]);
   // const navigate = useNavigate();
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

   const fetchMe = async () => {
      try {
         const response = await PersonService.getMe();

         console.log(response);
         dispatch(setMe(response.data));
      } catch (e) {
         console.log(e);
      }
   };

   useLayoutEffect(() => {
      const lastTheme = localStorage.getItem('theme');
      dispatch(setTheme(lastTheme ? (lastTheme as TTheme) : 'dark'));

      localStorage.setItem('theme', lastTheme ? lastTheme : 'dark');
      document.documentElement.setAttribute('data-theme', theme);

      // navigate(
      //    isAuth ? '/signin' : '/about',
      // );
   }, []);

   const handleRefresh = async (data: IRefreshInputs) => {
      try {
         const { refresh, device } = data;
         const response = await axios.post<AuthResponse>(
            `${BASE_URL}/auth/refresh`,
            {
               refreshToken: refresh,
               deviceName: device,
            },
         );

         localStorage.setItem('token', response.data.jwtToken);
         localStorage.setItem('refresh', response.data.refreshToken);
         console.log(200);
         dispatch(setIsAuth(true));
      } catch (e) {
         localStorage.removeItem('token');
         localStorage.removeItem('refresh');
         console.log(400);
         dispatch(setIsAuth(false));
      }
   };

   useEffect(() => {
      const refreshToken = localStorage.getItem('refresh');
      const jwtToken = localStorage.getItem('token');
      if (refreshToken && jwtToken) {
         handleRefresh({
            device: getBrowserAndOS(navigator.userAgent),
            refresh: refreshToken,
         });

         dispatch(setIsAuth(true));
         fetchMe();
         console.log(isAuth);
         console.log(getCountry());
         dispatch(setLang(changeStartLang(getCountry())));
         console.log(countryCode);
      } else {
         dispatch(setIsAuth(false));
         localStorage.removeItem('token');
         localStorage.removeItem('refresh');
      }
   }, []);

   useEffect(() => {
      if (isAuth) {
         fetchMe();
      }
   }, [isAuth]);

   // let router = useMemo(() => {
   //    return createBrowserRouter([
   //       {
   //          path: '/',
   //          element: <Layout />,
   //          errorElement: <ErrorPage/>,
   //          children: isAuth ? authRoutes : unAuthRoutes,
   //          // children: routes,
   //       },
   //    ])
   // }, [isAuth]);

   // return <RouterProvider router={router} />;

   return (
      <BrowserRouter>
         <Routes>
            {unAuthRoutes.map((route) => (
               <Route path={route.path} element={route.element} />
            ))}
            <Route element={<Layout />}>
               {authRoutes.map((route) => (
                  <Route path={route.path} element={route.element} />
               ))}
            </Route>
         </Routes>
      </BrowserRouter>
   );
};

export default App;
