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

      // if (accessToken) {
      //    // const decodedToken = jwtDecode(accessToken);
      //    // if (decodedToken.exp) {
      //    //    let expTime = decodedToken.exp * 1000;
      //    //    let curTime = new Date().getTime();

      //    //    if (expTime - curTime <= -3000) {
      //    //       if (refreshToken) {
      //    //          const newAccess = handleRefresh(refreshToken);

      //    //          config.headers.Authorization = `Bearer ${newAccess}`;
      //    //       } else {
      //    //          handleLogout();
      //    //       }
      //    //    } else {
      //    config.headers.Authorization = `Bearer ${accessToken}`;
      // } else if (refreshToken) {
      //    handleRefresh(refreshToken);

      //    const newAccess = localStorage.getItem('token');

      //    if (newAccess) {
      //       config.headers.Authorization = `Bearer ${newAccess}`;
      //    }
      // } else {
      //    handleLogout();
      // }
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
      }

      return config;
   },
   (error: AxiosError) => {
      return Promise.reject(error);
   },
);

$api.interceptors.response?.use(
   (response: AxiosResponse) => {
      return response;
   },
   async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if (status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         const { accessToken, refreshToken } = getTokens();

         if (refreshToken) {
            const newAccess = handleRefresh(refreshToken);
            if (newAccess) {
               originalRequest.headers.Authorization = `Bearer ${newAccess}`;
               return $api(originalRequest);
            } else {
               handleLogout();
               return Promise.reject(error);
            }
         } else {
            handleLogout();
            return Promise.reject(error);
         }
      }

      return Promise.reject(error);
   },
);

export default $api;
