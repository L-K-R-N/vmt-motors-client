import { ILoginInputs } from '@/pages/auth/LoginPage/useLoginPage';
import { IRegisterInputs } from '@/pages/auth/RegisterPage/useRegisterForm';

// requests
export type ILoginRequest = ILoginInputs;

export type IRegisterRequest = Omit<IRegisterInputs, 'email'>;

export interface IVerifyRequest {
   email: string;
   accessToken: string;
}

// responses

export interface IAuthResponse {
   jwtToken: string;
   refreshToken: string;
}
