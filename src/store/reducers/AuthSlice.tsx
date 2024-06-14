import AuthService from '@/api/services/AuthService';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IUser } from '@/models/User.types';
import { IRegisterInputs } from '@/pages/auth/RegisterPage/useRegister';
import { IVerificationInputs } from '@/pages/auth/RegisterPage/useVerification';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMe } from './UserSlice';
import { ILoginInputs } from '@/pages/auth/LoginPage/useLoginPage';
import axios from 'axios';
import { BASE_URL } from '@/api/app.vars';
import { AuthResponse } from '@/api/models/response/AuthResponse';

export interface IAuthState {
   isAuth: boolean;
   isSeller: boolean;
   users: IUser[];
}

const initialState: IAuthState = {
   // isAuth: !!localStorage.getItem(TOKEN),
   isAuth: false,
   isSeller: true,
   users: [],
};

export interface IRefreshInputs {
   refresh: string;
   device: string;
}

export const register = createAction<IRegisterInputs, 'auth/register'>(
   'auth/register',
);
export const login = createAction<ILoginInputs, 'auth/login'>('auth/login');
export const refresh = createAction<IRefreshInputs, 'auth/refresh'>(
   'auth/refresh',
);
export const verify = createAction<IVerificationInputs, 'auth/verify'>(
   'auth/verify',
);
export const logout = createAction<void, 'auth/logout'>('auth/logout');

export function getBrowserAndOS(userAgent: string) {
   const browserRegex =
      /(Chrome|Firefox|Safari|Opera|Trident|Edge|MSIE|Mobile Safari)/;

   const osRegex = /(Windows|Linux|Mac OS|Android|iPhone|iPad)/;

   const browserMatch = browserRegex.exec(userAgent);
   const browser = browserMatch ? browserMatch[1] : 'Unknown';

   const osMatch = osRegex.exec(userAgent);
   const os = osMatch ? osMatch[1] : 'Unknown';

   return `${browser}-${os}`;
}

export const AuthSlice = createSlice({
   name: 'AuthSlice',
   initialState,
   reducers: {
      setIsAuth: (state, action: PayloadAction<boolean>) => {
         state.isAuth = action.payload;
      },
      setIsSeller: (state, action: PayloadAction<boolean>) => {
         state.isSeller = action.payload;
      },
      setUsers: (state, action: PayloadAction<IUser[]>) => {
         state.users = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(
         register,
         (state, action: PayloadAction<IRegisterInputs>) => {
            try {
               (async function () {
                  const {
                     // dateOfBirth,
                     name,
                     password,
                     username,
                     email,
                     gender,
                  } = action.payload;
                  const dateOfBirth = new Date();
                  const registerResponse = await AuthService.register(
                     username,
                     password,
                     name,
                     dateOfBirth,
                     gender,
                  );
                  console.log(state);

                  console.log(registerResponse.data);

                  if (registerResponse.status === 200) {
                     const loginResponse = await AuthService.login(
                        username,
                        password,
                        getBrowserAndOS(navigator.userAgent),
                     );

                     console.log(loginResponse);

                     localStorage.setItem(
                        'token',
                        `Bearer ${loginResponse.data.jwtToken}`,
                     );

                     localStorage.setItem(
                        'refresh',
                        loginResponse.data.refreshToken,
                     );

                     if (loginResponse.status === 200) {
                        await AuthService.verificationEmailSend(
                           loginResponse.data.jwtToken,
                           email,
                        );

                        getMe();
                     }
                  }
               })();
            } catch (e) {}
         },
      );
      builder.addCase(login, (state, action: PayloadAction<ILoginInputs>) => {
         try {
            (async function () {
               console.log(state);

               const { password, username } = action.payload;
               const loginResponse = await AuthService.login(
                  username,
                  password,
                  getBrowserAndOS(navigator.userAgent),
               );
               console.log(loginResponse);

               if (loginResponse.status === 200) {
                  localStorage.setItem(
                     'token',
                     `Bearer ${loginResponse.data.jwtToken}`,
                  );

                  localStorage.setItem(
                     'refresh',
                     loginResponse.data.refreshToken,
                  );

                  setIsAuth(true);
                  getMe();
               }
            })();
         } catch (e) {}
      });
      builder.addCase(
         verify,
         (state, action: PayloadAction<IVerificationInputs>) => {
            try {
               console.log(state);

               (async function () {
                  const { code } = action.payload;
                  // const dispatch = useAppDispatch();
                  const verifyResponse =
                     await AuthService.verificationEmailVerify(code);

                  if (verifyResponse.status === 200) {
                     setIsAuth(true);
                  }
               })();
            } catch (e) {}
         },
      );
      builder.addCase(logout, (state, action: PayloadAction) => {
         try {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            setIsAuth(false);
         } catch (e) {}
      });
      builder.addCase(
         refresh,
         (state, action: PayloadAction<IRefreshInputs>) => {
            try {
               (async function () {
                  const { refresh, device } = action.payload;

                  const response = await axios.post<AuthResponse>(
                     `${BASE_URL}/refresh`,
                     {
                        refreshToken: refresh,
                        deviceName: device,
                     },
                  );

                  console.log(response);
                  if (response.status === 200) {
                     localStorage.setItem('token', response.data.jwtToken);

                     setIsAuth(true);
                  }
               })();
            } catch (e) {}
         },
      );
   },
});

export default AuthSlice.reducer;

export const { setIsAuth, setIsSeller } = AuthSlice.actions;
