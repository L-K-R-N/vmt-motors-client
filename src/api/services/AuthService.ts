import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { IAuthResponse, ILoginRequest, IVerifyRequest } from '../models/Auth';
import { IRegisterFormShema } from '@/pages/auth/RegisterPage/RegisterPage';

export default class AuthService {
   static async login(
      data: ILoginRequest,
   ): Promise<AxiosResponse<IAuthResponse>> {
      return $api.post<IAuthResponse>('auth/login', {
         login: data?.username,
         password: data?.password,
         deviceName: data?.deviceName,
      });
   }

   static async register(data: IRegisterFormShema): Promise<AxiosResponse> {
      return $api.post('auth/signup', data);
   }
   static async verificationEmailSend(
      data: IVerifyRequest,
   ): Promise<AxiosResponse> {
      return $api.post('auth/verification/email/send', {
         access: data?.accessToken,
         email: data?.email,
      });
   }
   static async verificationEmailVerify(data: {
      code: string;
   }): Promise<AxiosResponse> {
      return $api.post('auth/verification/email/verify', {
         verificationCode: data?.code,
      });
   }
   static async forgotPassSend(email: string): Promise<AxiosResponse> {
      return $api.post('auth/forgot/email/send', {
         email,
      });
   }
   static async forgotPassVerify(data: {
      email: string;
      verificationCode: string;
      newPassword: string;
   }): Promise<AxiosResponse> {
      return $api.post('auth/forgot/email/verify', data);
   }

   static async logout(): Promise<void> {
      return $api.post('/logout');
   }
}
