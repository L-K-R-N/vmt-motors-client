import axios from 'axios';
import { API_URL, token } from './app.constants.js';
import { IRegisterInputs } from '@/pages/auth/RegisterPage/useRegisterPage.js';
import { ILoginInputs } from '@/pages/auth/LoginPage/useLoginPage.js';

export const $axios = axios.create({
   baseURL: API_URL,
});

export async function post_send_message(id: number, message: string) {
   return $axios.post(`/send_message/${id}`, {
      token,
      message,
   });
}

export async function get_ticket(id: number) {
   return $axios.post(`/get_ticket/${id}`, {
      token,
   });
}

export async function post_create_ticket(subject: string, message: string) {
   return $axios.post('/create_ticket', {
      token,
      subject,
      message,
   });
}

export async function get_token(data: ILoginInputs) {
   return $axios.post('/accounts/login', data);
}

export async function get_captcha() {
   return $axios.get('/get_captcha');
}

export async function postRecoveryFromEmail(username: string, email: string) {
   return $axios.post('/recovery_from_email', {
      username,
      email,
   });
}

export async function postCheckRecoveryFromEmail(code: number) {
   return $axios.post('/check_recovery_from_email', {
      code,
   });
}

export async function postCheckRecoveryFromEmail2(
   code: number,
   password: string,
) {
   return $axios.post('/check_recovery_from_email2', {
      code,
      password,
   });
}

export async function post_register(data: IRegisterInputs) {
   return $axios.post('/accounts/register', data);
}

// products
export async function get_products() {
   return $axios.get('/backGoods');
}
export async function post_products(data: IRegisterInputs) {
   return $axios.post('/accounts/register', data);
}
export async function update_products(data: IRegisterInputs) {
   return $axios.post('/accounts/register', data);
}
export async function delete_products(data: IRegisterInputs) {
   return $axios.post('/accounts/register', data);
}
