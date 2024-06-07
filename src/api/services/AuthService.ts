import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
   static async login(
      login: string,
      password: string,
      deviceName: string,
   ): Promise<AxiosResponse<AuthResponse>> {
      return $api.post<AuthResponse>('/api/auth/login', {
         login,
         password,
         deviceName,
      });
   }

   static async register(
      username: string,
      password: string,
      name: string,
      dateOfBirth: Date,
      gender: 'MALE' | 'FEMALE',
   ): Promise<AxiosResponse> {
      return $api.post('/api/auth/signup', {
         username,
         password,
         name,
         dateOfBirth,
         gender,
      });
   }
   static async verificationEmailSend(
      access: string,
      email: string,
   ): Promise<AxiosResponse> {
      return $api.post('/api/auth/verification/email/send', {
         access,
         email,
      });
   }
   static async verificationEmailVerify(code: string): Promise<AxiosResponse> {
      return $api.post('/api/auth/verification/email/verify', {
         code,
      });
   }

   static async logout(): Promise<void> {
      return $api.post('/logout');
   }
}
