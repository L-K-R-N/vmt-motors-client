import {
   getBrowserAndOS,
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
import { t } from 'i18next';
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
               return `${data}`?.includes('401')
                  ? 'Время сессии истекло, нужно авторизоваться повторно'
                  : 'Необработанная ошибка';
               // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
            },
         },
      })
      .then((res) => {
         localStorage.setItem('token', res?.data?.jwtToken);
         localStorage.setItem('refresh', res?.data?.refreshToken);
         store.dispatch(setIsAuth(true));

         return res?.data?.jwtToken;
      })
      .catch(() => {
         localStorage.removeItem('token');
         localStorage.removeItem('refresh');
         store.dispatch(setIsAuth(false));
      });

   return '';
};

export interface NewJwtPayload extends JwtPayload {
   role: string;
}
export const handleLogin = async (data: ILoginFormShema) => {
   const { password, username } = data;
   try {
      AuthService.login({
         username,
         password,
         deviceName: getBrowserAndOS(navigator.userAgent),
      })
         .then((res) => {
            const decodedToken: NewJwtPayload = jwtDecode(res.data.jwtToken);
            localStorage.setItem('token', res?.data?.jwtToken);
            localStorage.setItem('refresh', res?.data?.refreshToken);

            // console.log(decodedToken);
            if (decodedToken.role === 'DEFAULT') {
               store.dispatch(setIsVerifing(true));
               window.location.pathname = '/verify';
            } else {
               store.dispatch(setIsAuth(true));
               window.location.pathname = '/about';
            }
         })
         .catch((e: { response: { status: number } }) => {
            switch (e.response.status) {
               case 429:
                  toast.error(t('many_requests_error'));
                  break;
               case 401:
                  toast.error(
                     `${t('uncorrect')} ${t('login')} ${t('or')} ${t('password')}`,
                  );
                  break;
               default:
                  toast.error(t('default_error'));
            }
         });
   } catch (e) {
      console.log(e);
   }
};

export const handleRegister = async (data: IRegisterFormShema) => {
   try {
      AuthService.register(data)
         .then((res) => {
            toast.success(t('successful_register'));
            handleLogin({
               username: data?.username,
               password: data?.password,
            });
         })
         .catch((rej: { response: { status: number } }) => {
            switch (rej.response.status) {
               case 429:
                  toast.error(t('many_requests_error'));
                  break;
               case 409:
                  toast.error(
                     `${t('email')} ${t('or')} ${t('username')} ${t('already_in_use')}`,
                  );
                  break;
               default:
                  toast.error(t('default_error'));
            }

            // console.log();
         });

      // toast
      //    .promise(registerResponse, {
      //       pending: 'Проверяем валидность данных...',
      //       success: 'Регистрация прошла успешно, создаем Ваш аккаунт...',
      //       error: {
      //          render({ data }) {
      //             return `${data}`?.includes('429')
      //                ? 'Слишком много попыток, попробуйте позже'
      //                : `${data}`?.includes('409')
      //                  ? 'Username уже занят'
      //                  : 'Необработанная ошибка';
      //             // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
      //          },
      //       },
      //    })
      // .then(() => {
      //    handleLogin({
      //       username: data?.username,
      //       password: data?.password,
      //    });
      // });
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
               return `${data}`?.includes('429')
                  ? 'Слишком много попыток, попробуйте позже'
                  : `${data}`?.includes('412')
                    ? 'Код устарел, попробуйте снова'
                    : `${data}`?.includes('422')
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
      email: data?.email,
      accessToken: data?.accessToken,
   });

   toast
      .promise(verifyResponse, {
         pending: 'Проверяем ваш email адрес...',
         success: 'Мы отправили код подтверждения вам на почту!',
         error: {
            render({ data }) {
               return `${data}`?.includes('429')
                  ? 'Слишком много попыток, попробуйте позже'
                  : `${data}`?.includes('409')
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

export const handleForgotSend = (email: string) => {
   const res = AuthService.forgotPassSend(email)
      .then(() => {
         toast.success('Проверьте почту!');
      })
      .then(() => {
         return true;
      })
      .catch((rej) => {
         toast.error('Непредвиденная ошибка');
         return false;
      });

   return res;
   // toast
   //    .promise(verifyResponse, {
   //       pending: 'Проверяем ваш email адрес...',
   //       success: 'Мы отправили код подтверждения вам на почту!',
   //       error: {
   //          render({ data }) {
   //             return `${data}`?.includes('429')
   //                ? 'Слишком много попыток, попробуйте позже'
   //                : `${data}`?.includes('409')
   //                  ? 'Email уже занят'
   //                  : 'Необработанная ошибка';
   //          },
   //       },
   //    })
   //    .then(() => {
   //       return true;
   //    })
   //    .catch((rej) => {
   //       return false;
   //    });
};

export const handleForgotVerify = async (data: {
   email: string;
   verificationCode: string;
   newPassword: string;
}) => {
   AuthService.forgotPassVerify(data)
      .then((res) => {
         toast.success('Новый пароль сохранен!');
         handleLogin({ username: data.email, password: data.newPassword });
      })
      .catch((rej) => {
         toast.success('Непредвиденная ошибка');
         console.log(rej);
      });

   // toast
   //    .promise(verifyResponse, {
   //       pending: 'Проверяем валидность кода',
   //       success: 'Аккаунт успешно подтвержден!',
   //       error: {
   //          render({ data }) {
   //             return `${data}`?.includes('429')
   //                ? 'Слишком много попыток, попробуйте позже'
   //                : `${data}`?.includes('412')
   //                  ? 'Код устарел, попробуйте снова'
   //                  : `${data}`?.includes('422')
   //                    ? 'Вы ввели неверный код'
   //                    : 'Необработанная ошибка';
   //          },
   //       },
   //    })
   //    .then(() => {
   //       const refreshToken = localStorage.getItem('refresh');
   //       if (refreshToken) {
   //          handleRefresh(refreshToken);

   //          store.dispatch(setIsAuth(true));
   //          store.dispatch(setIsVerifing(false));

   //          window.location.pathname = '/about';
   //       }
   //    });
};
