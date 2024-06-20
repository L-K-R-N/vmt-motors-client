import { AxiosResponse } from 'axios';
import $api from '../public.api';
import {
   IAuthResponse,
   ILoginRequest,
   IRegisterRequest,
   IVerifyRequest,
} from '../models/Auth';

export default class AuthService {
   static async login(
      data: ILoginRequest,
   ): Promise<AxiosResponse<IAuthResponse>> {
      return $api.post<IAuthResponse>('auth/login', {
         login: data.username,
         password: data.password,
         deviceName: data.deviceName,
      });
   }

   static async register(data: IRegisterRequest): Promise<AxiosResponse> {
      return $api.post('auth/signup', {
         username: data.username,
         password: data.password,
         name: data.name,
      });
   }
   static async verificationEmailSend(
      data: IVerifyRequest,
   ): Promise<AxiosResponse> {
      return $api.post('auth/verification/email/send', {
         access: data.accessToken,
         email: data.email,
      });
   }
   static async verificationEmailVerify(data: {
      code: string;
   }): Promise<AxiosResponse> {
      return $api.post('auth/verification/email/verify', {
         verificationCode: data.code,
      });
   }

   static async logout(): Promise<void> {
      return $api.post('/logout');
   }
}
