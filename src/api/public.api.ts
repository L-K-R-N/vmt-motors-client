import axios from 'axios';
import { BASE_URL } from './app.vars.ts';

export const $api = axios.create({
   withCredentials: true,
   baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
   if (localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer${localStorage.getItem('token')}`;
   }
   // config.headers['Access-Control-Allow-Origin'] = '*';
   return config;
});

export default $api;
