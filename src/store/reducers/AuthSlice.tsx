import AuthService from '@/api/services/AuthService';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IUser } from '@/models/User.types';
import { IRegisterInputs } from '@/pages/auth/RegisterPage/useRegister';
import { IVerificationInputs } from '@/pages/auth/RegisterPage/useVerification';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setMe } from './UserSlice';
import { ILoginInputs } from '@/pages/auth/LoginPage/useLoginPage';

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

export const register = createAction<IRegisterInputs, 'auth/register'>(
   'auth/register',
);
export const login = createAction<ILoginInputs, 'auth/login'>('auth/login');
export const verify = createAction<IVerificationInputs, 'auth/verify'>(
   'auth/verify',
);
export const logout = createAction<void, 'auth/logout'>('auth/logout');

function getBrowserAndOS(userAgent: string) {
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
                  console.log(action.payload);

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

                     if (loginResponse.status === 200) {
                        await AuthService.verificationEmailSend(
                           loginResponse.data.jwtToken,
                           email,
                        );
                     }
                  }
               })();
            } catch (e) {}
         },
      );
      builder.addCase(login, (state, action: PayloadAction<ILoginInputs>) => {
         try {
            (async function () {
               const { password, username } = action.payload;
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

               if (loginResponse.status === 200) {
                  setIsAuth(true);
               }
            })();
         } catch (e) {}
      });
      builder.addCase(
         verify,
         (state, action: PayloadAction<IVerificationInputs>) => {
            try {
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
            const dispatch = useAppDispatch();

            dispatch(setIsAuth(false));
         } catch (e) {}
      });
   },
});

export default AuthSlice.reducer;

export const { setIsAuth, setIsSeller } = AuthSlice.actions;
