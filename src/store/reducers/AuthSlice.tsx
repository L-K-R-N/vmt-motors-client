import { IUser } from '@/models/User.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export default AuthSlice.reducer;

export const { setIsAuth, setIsSeller } = AuthSlice.actions;
