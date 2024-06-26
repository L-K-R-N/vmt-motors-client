import { IUser } from '@/api/models/Person';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
   isAuth: boolean;
   isVerifing: boolean;
   isSeller: boolean;
   users: IUser[];
}

const initialState: IAuthState = {
   isAuth: !!localStorage.getItem('token'),
   isVerifing: false,
   isSeller: true,
   users: [],
};

export interface IRefreshInputs {
   refresh: string;
   device?: string;
}

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
      setIsVerifing: (state, action: PayloadAction<boolean>) => {
         state.isVerifing = action.payload;
      },
   },
});

export default AuthSlice.reducer;

export const { setIsAuth, setIsSeller, setIsVerifing } = AuthSlice.actions;
