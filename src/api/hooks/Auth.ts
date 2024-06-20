import {
   getBrowserAndOS,
   IRefreshInputs,
   setIsAuth,
   setIsVerifing,
} from '@/store/reducers/AuthSlice';
import axios from 'axios';
import { BASE_URL } from '../app.vars';
import { IAuthResponse } from '../models/Auth';
import { IRegisterInputs } from '@/pages/auth/RegisterPage/useRegisterForm';
import AuthService from '../services/AuthService';
import { NavigateFunction } from 'react-router-dom';
import { ILoginInputs } from '@/pages/auth/LoginPage/useLoginPage';
import { AppDispatch } from '@/store';
import { IVerificationInputs } from '@/pages/auth/VerifyPage/useVerification';
import { IRegisterFormShema } from '@/pages/auth/RegisterPage/RegisterPage';

export const handleRefresh = async (
   data: IRefreshInputs,
   dispatch: AppDispatch,
) => {
   try {
      const { refresh, device } = data;
      const response = await axios.post<IAuthResponse>(
         `${BASE_URL}/auth/refresh`,
         {
            refreshToken: refresh,
            deviceName: device,
         },
      );

      localStorage.setItem('token', response.data.jwtToken);
      localStorage.setItem('refresh', response.data.refreshToken);
      console.log(200);
      dispatch(setIsAuth(true));

      return response.data.jwtToken;
   } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      console.log(400);
      dispatch(setIsAuth(false));
   }
};

export const handleRegister = async (
   data: IRegisterFormShema,
   dispatch: AppDispatch,
   navigate: NavigateFunction,
) => {
   try {
      const dateOfBirth = new Date();
      const registerResponse = await AuthService.register({
         password: data.password,
         username: data.username,
         name: data.name,
      });

      console.log(registerResponse.data);

      const loginResponse = await AuthService.login({
         username: data.username,
         password: data.password,
         deviceName: getBrowserAndOS(navigator.userAgent),
      });

      console.log(loginResponse);

      localStorage.setItem('token', loginResponse.data.jwtToken);

      localStorage.setItem('refresh', loginResponse.data.refreshToken);

      const token = localStorage.getItem('token');

      if (token) {
         await AuthService.verificationEmailSend({
            email: data.email,
            accessToken: token,
         });

         dispatch(setIsVerifing(true));
         navigate('/verify');
      }
   } catch (e) {
      console.log(e);
   }
};

export const handleLogin = async (
   data: ILoginInputs,
   dispatch: AppDispatch,
   navigate: NavigateFunction,
) => {
   try {
      const { password, username } = data;
      const loginResponse = await AuthService.login({
         username,
         password,
         deviceName: getBrowserAndOS(navigator.userAgent),
      });
      console.log(loginResponse);

      localStorage.setItem('token', loginResponse.data.jwtToken);

      localStorage.setItem('refresh', loginResponse.data.refreshToken);

      dispatch(setIsAuth(true));

      // navigate(from, {replace: true})
      navigate('/about');
      // getMe();
   } catch (e) {
      console.log(e);
   }
};

export const handleLogout = async (
   dispatch: AppDispatch,
   navigate: NavigateFunction,
) => {
   try {
      dispatch(setIsAuth(false));
      localStorage.removeItem('refresh');
      localStorage.removeItem('token');
      navigate('/signin');
   } catch (e) {
      console.log(e);
   }
};

export const handleVerify = async (
   inputs: IVerificationInputs,
   dispatch: AppDispatch,
   navigate: NavigateFunction,
) => {
   try {
      await AuthService.verificationEmailVerify({
         code: inputs.code,
      });

      dispatch(setIsAuth(true));
      dispatch(setIsVerifing(false));

      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
         handleRefresh(
            {
               device: getBrowserAndOS(navigator.userAgent),
               refresh: refreshToken,
            },
            dispatch,
         );

         navigate('/about');
      }
   } catch (e) {
      console.log(e);
   }
};
