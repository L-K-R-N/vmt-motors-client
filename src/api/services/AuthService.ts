import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { AuthResponse } from '../models/response/AuthResponse';
import { ILoginInputs } from '@/pages/auth/LoginPage/useLoginPage';
import { IRegisterInputs } from '@/pages/auth/RegisterPage/useRegister';

export default class AuthService {
   static async login(data: ILoginInputs): Promise<AxiosResponse<AuthResponse>> {
      return $api.post<AuthResponse>('auth/login', {
         login: data.username,
         password: data.password,
         deviceName: data.deviceName,
      });
   }

   static async register(data: IRegisterInputs): Promise<AxiosResponse> {
      return $api.post('auth/signup', {
         username: data.username,
         password: data.password,
         name: data.name,
         dateOfBirth: data.dateOfBirth,
         gender: data.gender
      });
   }
   static async verificationEmailSend(
      access: string,
      email: string,
   ): Promise<AxiosResponse> {
      return $api.post('auth/verification/email/send', {
         access,
         email,
      });
   }
   static async verificationEmailVerify(code: string): Promise<AxiosResponse> {
      return $api.post('auth/verification/email/verify', {
         code,
      });
   }

   static async logout(): Promise<void> {
      return $api.post('/logout');
   }

  
}
