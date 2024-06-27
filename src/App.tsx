import {
   BrowserRouter,
   Route,
   RouteObject,
   Routes,
   useLocation,
   useNavigate,
} from 'react-router-dom';
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
import { setTheme, TTheme } from './store/reducers/SettingsSlice';
import { ChatsPage } from './pages/other/ChatsPage';
import axios from 'axios';
import {
   IRefreshInputs,
   getBrowserAndOS,
   setIsAuth,
} from './store/reducers/AuthSlice';
import { IAuthResponse } from './api/models/Auth';
import { BASE_URL } from './api/app.vars';
import { handleGetMe } from './api/hooks/Person';
import { VerifyPage } from './pages/auth/VerifyPage';
import { ToastContainer } from 'react-toastify';
import { handleRefresh } from './api/hooks/Auth';
import { PrivateRoute } from './components/layout/PrivateRoute/PrivateRoute';
import { setIsAdmin } from './store/reducers/UserSlice';
import { AdminRoute } from './components/layout/AdminRoute/AdminRoute';
import { ChangeProfilePage } from './pages/other/ChangeProfilePage';
import { BasketPage } from './pages/other/BasketPage';
import { ChangeAdvertPage } from './pages/other/ChangeAdvertPage';
// import { useGetMe } from './api/hooks/Person';

// const authRoutes: RouteObject[] = [];

const App = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const dispatch = useAppDispatch();
   // const navigate = useNavigate()
   // const { data: me, isLoading, isError } = useGetMeQuery();
   const { theme } = useAppSelector((state) => state.SettingsReducer);
   const [countryCode, setCountryCode] = useState<string | null>(null);
   const [unAuthRoutes, setUnAuthRoutes] = useState<RouteObject[]>([
      {
         path: '/signup',
         element: <RegisterPage />,
         // loader: () => !isAuth,
      },
      {
         path: '/verify',
         element: <VerifyPage />,
         // loader: () => !isAuth,
      },
      {
         path: '/signin',
         element: <LoginPage />,
         // loader: () => !isAuth,
      },
      {
         path: '/catalog',
         element: <CatalogPage />,
         // loader: () => isAuth,
      },
      {
         path: '/about',
         element: <MainPage />,
         // loader: () => isAuth,
      },

      {
         path: '/profile/:id',
         element: <ProfilePage />,
         // loader: () => isAuth,
      },

      {
         path: '/adverts/buy/:id',
         element: <ProductPage />,
         // loader: () => isAuth,
      },
   ]);

   const { me } = useAppSelector((state) => state.UserReducer);
   const [authRoutes, setAuthRoutes] = useState<RouteObject[]>([
      // {
      //    path: 'loader',
      //    element: <Loader />,
      // },

      {
         path: '/add',
         element: <AddAdvertPage />,
         // loader: () => isAuth,
      },
      {
         path: 'adverts/change/:productId',
         element: <ChangeAdvertPage />,
         // loader: () => isAuth,
      },

      {
         path: '/profile/me/change',
         element: <ChangeProfilePage />,
         // loader: () => isAuth,
      },

      {
         path: '/chats',
         element: <ChatsPage />,
         // loader: () => isAuth,
      },
      {
         path: '/cart',
         element: <BasketPage />,
         // loader: () => isAuth,
      },
      {
         path: '/chats/:personId',
         element: <ChatsPage />,
         // loader: () => isAuth,
      },
   ]);

   const [adminRoutes, setAdminRoutes] = useState<RouteObject[]>([
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

   // async function getCountry() {
   //    const res = await axios.get<{ countryCode: string }>(
   //       'http://ip-api.com/json',
   //    );
   //    console.log(res, res.status === 200, res.data?.countryCode);
   //    if (res.status === 200) {
   //       return res.data?.countryCode;
   //    }
   // }

   // const changeStartLang = (countryCode: Promise<string | undefined>) => {
   //    let newLang: TLanguage = 'en';
   //    let code: string | undefined = 'EN';
   //    countryCode.then((res) => {
   //       code = res;
   //       console.log(res, code);
   //    });

   //    console.log(code);

   //    switch (code) {
   //       case 'RU':
   //          newLang = 'ru';
   //          break;
   //       case 'KR':
   //          newLang = 'ko';
   //          break;
   //       case 'BY':
   //          newLang = 'be';
   //          break;
   //       case 'KZ':
   //          newLang = 'kk';
   //          break;
   //       case 'CN':
   //          newLang = 'zh';
   //          break;
   //       case 'UA':
   //          newLang = 'uk';
   //          break;
   //    }

   //    return newLang;
   // };

   useLayoutEffect(() => {
      const lastTheme = localStorage.getItem('theme');
      dispatch(setTheme(lastTheme ? (lastTheme as TTheme) : 'dark'));

      localStorage.setItem('theme', lastTheme ? lastTheme : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
      if (window.location.pathname === '/') {
         window.location.pathname = '/about';
      }

      // const refresh = localStorage.getItem('refresh');

      // if (refresh) {

      //    handleRefresh({
      //       refresh
      //    })
      // }
   }, []);

   useEffect(() => {
      if (
         (me && isAuth && me.roles.includes('MODERATOR')) ||
         me?.roles.includes('ADMIN')
      ) {
         dispatch(setIsAdmin(true));
      } else {
         dispatch(setIsAdmin(false));
      }
   }, [me, isAuth]);

   // useEffect(() => {
   //    const refresh = localStorage.getItem('refresh');
   //    if (refresh) {
   //       handleRefresh({
   //          refresh: refresh,
   //          device: getBrowserAndOS(navigator.userAgent),
   //       });
   //    }
   // }, []);

   useEffect(() => {
      if (isAuth) {
         // dispatch(setMe(handleGetMe(dispatch)));
         // const refresh = localStorage.getItem('refresh');
         // if (refresh) {
         //    handleRefresh({
         //       refresh: refresh,
         //       device: getBrowserAndOS(navigator.userAgent),
         //    });
         // }
         handleGetMe();
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
         <ToastContainer limit={3} />
         <Routes>
            <Route element={<Layout />}>
               {unAuthRoutes.map((route) => (
                  <Route
                     key={route.path}
                     path={route.path}
                     element={route.element}
                  />
               ))}
               <Route element={<PrivateRoute />}>
                  {authRoutes.map((route) => (
                     <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                     />
                  ))}

                  <Route element={<AdminRoute />}>
                     {adminRoutes.map((route) => (
                        <Route
                           key={route.path}
                           path={route.path}
                           element={route.element}
                        />
                     ))}
                  </Route>
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
};

export default App;
