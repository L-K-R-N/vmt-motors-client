import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from './app.vars.ts';
import { handleLogout, handleRefresh } from './hooks/Auth.ts';
import { jwtDecode } from 'jwt-decode';

export const $api: AxiosInstance = axios.create({
   withCredentials: true,
   baseURL: BASE_URL,
   headers: {
      'Access-Control-Allow-Origin': '*',
   },
});

export const getTokens = () => {
   const accessToken = localStorage.getItem('token');
   const refreshToken = localStorage.getItem('refresh');

   return { accessToken, refreshToken };
};

$api.interceptors.request.use(
   async (config) => {
      const { accessToken, refreshToken } = getTokens();

      if (accessToken) {
         const decodedToken = jwtDecode(accessToken);
         if (decodedToken.exp) {
            let expTime = decodedToken.exp * 1000;
            let curTime = new Date().getTime();

            if (expTime - curTime <= -3000) {
               if (refreshToken) {
                  const newAccess = handleRefresh(refreshToken);

                  config.headers.Authorization = `Bearer ${newAccess}`;
               } else {
                  handleLogout();
               }
            } else {
               config.headers.Authorization = `Bearer ${accessToken}`;
            }
         }

         // if ()
         // } else if (refreshToken) {
         //    const newAccess = handleRefresh({
         //       device: navigator.userAgent,
         //       refresh: refreshToken,
         //    });
         //    config.headers.Authorization = `Bearer ${newAccess}`;
      }

      return config;
   },
   (error: AxiosError) => {
      return Promise.reject(error);
   },
);

$api.interceptors.response.use(
   (response: AxiosResponse) => {
      return response;
   },
   async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if (status === 401 && !originalRequest._retry401) {
         originalRequest._retry401 = true;
         const refresh = localStorage.getItem('refresh');

         if (refresh) {
            const newAccessToken = handleRefresh(refresh);

            if (newAccessToken) {
               originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
               return $api(originalRequest);
            } else {
               return Promise.reject(error);
            }
         }
      }

      // if (status === 403 && !originalRequest._retry403) {
      //    originalRequest._retry403 = true;
      //    const newAccessToken = await refreshTokens();

      //    if (newAccessToken) {
      //       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      //       return $api(originalRequest);
      //    } else {
      //       return Promise.reject(error);
      //    }
      // }
      // const decodedToken = jwtDecode(access);
      // console.log(decodedToken, decodedToken.exp);
      // if (decodedToken.exp) {
      //    let expTime = decodedToken.exp * 1000;
      //    let curTime = new Date().getTime();

      //    console.log(expTime - curTime);

      //    if (expTime - curTime <= -3000) {
      //       const newAccess = refreshTokens();
      //       config.headers.Authorization = `Bearer ${newAccess}`;
      //    } else {
      //    }
      // }
   },
);

export default $api;
