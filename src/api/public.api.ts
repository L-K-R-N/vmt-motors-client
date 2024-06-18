import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from './app.vars.ts';
import { handleRefresh } from './hooks/Auth.ts';
import { IAuthResponse } from './models/Auth.ts';
import { getBrowserAndOS } from '@/store/reducers/AuthSlice.tsx';
import { jwtDecode } from 'jwt-decode';

export const $api: AxiosInstance = axios.create({
   withCredentials: true,
   baseURL: BASE_URL,
   headers: {
      'Access-Control-Allow-Origin': '*',
   },
});

const getTokens = () => {
   const accessToken = localStorage.getItem('token');
   const refreshToken = localStorage.getItem('refresh');

   return { accessToken, refreshToken };
};

const refreshTokens = async () => {
   const { refreshToken } = getTokens();

   try {
      const response = await axios.post<IAuthResponse>(
         `${BASE_URL}/auth/refresh`,
         {
            refreshToken: localStorage.getItem('refresh'),
            deviceName: getBrowserAndOS(navigator.userAgent),
         },
      );

      localStorage.setItem('token', response.data.jwtToken);
      localStorage.setItem('refresh', response.data.refreshToken);

      return response.data.jwtToken;
   } catch (e) {
      console.log(e);
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');

      return null;
   }
};

$api.interceptors.request.use(
   async (config) => {
      const access = localStorage.getItem('token');

      if (access) {
         const decodedToken = jwtDecode(access);
         // console.log(decodedToken, decodedToken.exp);
         if (decodedToken.exp) {
            let expTime = decodedToken.exp * 1000;
            let curTime = new Date().getTime();

            console.log(expTime - curTime);

            if (expTime - curTime <= -3000) {
               const newAccess = refreshTokens();
               config.headers.Authorization = `Bearer ${newAccess}`;
            } else {
               config.headers.Authorization = `Bearer ${access}`;
            }
         }

         // if ()
      }
      // config.headers['Access-Control-Allow-Origin'] = `*`;
      // config.headers['Access-Control-Allow-Origin'] = '*';
      return config;
   },
   (error: AxiosError) => {
      return Promise.reject(error);
   },
);

// $api.interceptors.response.use(
//    (response: AxiosResponse) => {
//       return response;
//    },
//    async (error) => {
//       const originalRequest = error.config;
//       const status = error.response?.status;

//       if (status === 401 && !originalRequest._retry401) {
//          originalRequest._retry401 = true;
//          const newAccessToken = await refreshTokens();

//          if (newAccessToken) {
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             return $api(originalRequest);
//          } else {
//             return Promise.reject(error);
//          }
//       }

//       if (status === 403 && !originalRequest._retry403) {
//          originalRequest._retry403 = true;
//          const newAccessToken = await refreshTokens();

//          if (newAccessToken) {
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             return $api(originalRequest);
//          } else {
//             return Promise.reject(error);
//          }
//       }
//       // const decodedToken = jwtDecode(access);
//       // console.log(decodedToken, decodedToken.exp);
//       // if (decodedToken.exp) {
//       //    let expTime = decodedToken.exp * 1000;
//       //    let curTime = new Date().getTime();

//       //    console.log(expTime - curTime);

//       //    if (expTime - curTime <= -3000) {
//       //       const newAccess = refreshTokens();
//       //       config.headers.Authorization = `Bearer ${newAccess}`;
//       //    } else {
//       //    }
//       // }
//    },
// );

export default $api;
