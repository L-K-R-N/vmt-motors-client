import axios from 'axios';
import { API_URL, token } from './app.vars.ts';
import { IRegisterInputs } from '@/pages/auth/RegisterPage/useRegister.ts';
import { ILoginInputs } from '@/pages/auth/LoginPage/useLoginPage.ts';

export const $api = axios.create({
   withCredentials: true,
   baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
   if (localStorage.getItem('token')) {
      config.headers.Authorization = `${localStorage.getItem('token')}`;
   }
   return config;
});

export default $api;

// export async function post_send_message(id: number, message: string) {
//    return $api.post(`/send_message/${id}`, {
//       token,
//       message,
//    });
// }

// export async function get_ticket(id: number) {
//    return $api.post(`/get_ticket/${id}`, {
//       token,
//    });
// }

// export async function post_create_ticket(subject: string, message: string) {
//    return $api.post('/create_ticket', {
//       token,
//       subject,
//       message,
//    });
// }

// export async function get_token(data: ILoginInputs) {
//    return $api.post('/accounts/login', data);
// }

// export async function get_captcha() {
//    return $api.get('/get_captcha');
// }

// export async function postRecoveryFromEmail(username: string, email: string) {
//    return $api.post('/recovery_from_email', {
//       username,
//       email,
//    });
// }

// export async function postCheckRecoveryFromEmail(code: number) {
//    return $api.post('/check_recovery_from_email', {
//       code,
//    });
// }

// export async function postCheckRecoveryFromEmail2(
//    code: number,
//    password: string,
// ) {
//    return $api.post('/check_recovery_from_email2', {
//       code,
//       password,
//    });
// }

// export async function post_register(data: IRegisterInputs) {
//    return $api.post('/accounts/register', data);
// }

// // products
// export async function get_products() {
//    return $api.get('/backGoods');
// }
// export async function post_products(data: IRegisterInputs) {
//    return $api.post('/accounts/register', data);
// }
// export async function update_products(data: IRegisterInputs) {
//    return $api.post('/accounts/register', data);
// }
// export async function delete_products(data: IRegisterInputs) {
//    return $api.post('/accounts/register', data);
// }
