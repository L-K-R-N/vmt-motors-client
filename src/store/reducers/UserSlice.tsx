import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/api/models/Person';

export interface IUserState {
   me: IUser | null;
   isAdmin: boolean;
}

const initialState: IUserState = {
   me: null,
   isAdmin: false,
};

export const UserSlice = createSlice({
   name: 'UserSlice',
   initialState,
   reducers: {
      setMe: (state, action: PayloadAction<IUser | null>) => {
         state.me = action.payload;
      },
      setIsAdmin: (state, action: PayloadAction<boolean>) => {
         state.isAdmin = action.payload;
      },
   },
});

export default UserSlice.reducer;

export const { setMe, setIsAdmin } = UserSlice.actions;
