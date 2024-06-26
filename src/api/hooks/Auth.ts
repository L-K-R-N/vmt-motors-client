import {
   getBrowserAndOS,
   IRefreshInputs,
   setIsAuth,
   setIsVerifing,
} from '@/store/reducers/AuthSlice';
import axios from 'axios';
import { BASE_URL } from '../app.vars';
import { IAuthResponse } from '../models/Auth';
import AuthService from '../services/AuthService';
import { store } from '@/store';
import { IRegisterFormShema } from '@/pages/auth/RegisterPage/RegisterPage';
import { toast } from 'react-toastify';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { ILoginFormShema } from '@/pages/auth/LoginPage/LoginPage';

export const handleRefresh = (refresh: string) => {
   const refreshResponse = axios.post<IAuthResponse>(
      `${BASE_URL}/auth/refresh`,
      {
         refreshToken: refresh,
         deviceName: getBrowserAndOS(navigator.userAgent),
      },
   );

   toast
      .promise(refreshResponse, {
         error: {
            render({ data }) {
               return `${data}`.includes('401')
                  ? 'Время сессии истекло, нужно авторизоваться повторно'
                  : 'Необработанная ошибка';
               // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
            },
         },
      })
      .then((res) => {
         localStorage.setItem('token', res.data.jwtToken);
         localStorage.setItem('refresh', res.data.refreshToken);
         store.dispatch(setIsAuth(true));

         return res.data.jwtToken;
      })
      .catch(() => {
         localStorage.removeItem('token');
         localStorage.removeItem('refresh');
         store.dispatch(setIsAuth(false));
      });

   return '';
};

export interface NewJwtPayload extends JwtPayload {
   role: string[];
}
export const handleLogin = (data: ILoginFormShema) => {
   const { password, username } = data;
   const loginResponse = AuthService.login({
      username,
      password,
      deviceName: getBrowserAndOS(navigator.userAgent),
   });

   toast
      .promise(loginResponse, {
         pending: 'Проверяем валидность данных...',
         success: 'Вы успешно вошли в аккаунт! Осталось совсем чуть-чуть...',
         error: {
            render({ data }) {
               return `${data}`.includes('429')
                  ? 'Слишком много попыток, попробуйте позже'
                  : `${data}`.includes('401')
                    ? 'Вы ввели неверный логин или пароль'
                    : 'Необработанная ошибка';
               // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
            },
         },
      })
      .then((res) => {
         const decodedToken: NewJwtPayload = jwtDecode(res.data.jwtToken);
         // console.log(decodedToken, decodedToken.exp);
         localStorage.setItem('token', res.data.jwtToken);
         localStorage.setItem('refresh', res.data.refreshToken);
         if (decodedToken.role.includes('VERIFIED')) {
            store.dispatch(setIsAuth(true));

            window.location.pathname = '/about';
         } else {
            store.dispatch(setIsVerifing(true));
            window.location.pathname = '/verify';
         }

         // navigate(from, {replace: true})

         // getMe();
      });
};

export const handleRegister = async (data: IRegisterFormShema) => {
   try {
      const registerResponse = AuthService.register({
         password: data.password,
         username: data.username,
         name: data.name,
      });

      toast
         .promise(registerResponse, {
            pending: 'Проверяем валидность данных...',
            success: 'Регистрация прошла успешно, создаем Ваш аккаунт...',
            error: {
               render({ data }) {
                  return `${data}`.includes('429')
                     ? 'Слишком много попыток, попробуйте позже'
                     : `${data}`.includes('409')
                       ? 'Username уже занят'
                       : 'Необработанная ошибка';
                  // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
               },
            },
         })
         .then(() => {
            handleLogin({
               username: data.username,
               password: data.password,
            });
         });
   } catch (e) {
      console.log(e);
   }
};

export const handleLogout = () => {
   localStorage.removeItem('refresh');
   localStorage.removeItem('token');
   store.dispatch(setIsAuth(false));
   window.location.pathname = '/signin';
};

export const handleCheckCode = (code: string) => {
   const verifyResponse = AuthService.verificationEmailVerify({
      code: code,
   });

   toast
      .promise(verifyResponse, {
         pending: 'Проверяем валидность кода',
         success: 'Аккаунт успешно подтвержден!',
         error: {
            render({ data }) {
               return `${data}`.includes('429')
                  ? 'Слишком много попыток, попробуйте позже'
                  : `${data}`.includes('412')
                    ? 'Код устарел, попробуйте снова'
                    : `${data}`.includes('422')
                      ? 'Вы ввели неверный код'
                      : 'Необработанная ошибка';
            },
         },
      })
      .then(() => {
         const refreshToken = localStorage.getItem('refresh');
         if (refreshToken) {
            handleRefresh(refreshToken);

            store.dispatch(setIsAuth(true));
            store.dispatch(setIsVerifing(false));

            window.location.pathname = '/about';
         }
      });
};

export const handleCodeSend = (data: {
   email: string;
   accessToken: string;
}) => {
   const verifyResponse = AuthService.verificationEmailSend({
      email: data.email,
      accessToken: data.accessToken,
   });

   toast
      .promise(verifyResponse, {
         pending: 'Проверяем ваш email адрес...',
         success: 'Мы отправили код подтверждения вам на почту!',
         error: {
            render({ data }) {
               return `${data}`.includes('429')
                  ? 'Слишком много попыток, попробуйте позже'
                  : `${data}`.includes('409')
                    ? 'Email уже занят'
                    : 'Необработанная ошибка';
            },
         },
      })
      .then(() => {
         return true;
      })
      .catch((rej) => {
         return false;
      });
};
