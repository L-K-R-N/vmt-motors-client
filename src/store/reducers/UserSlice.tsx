import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/models/User.types';

export interface IUserState {
   me: IUser;
}

const initialState: IUserState = {
   me: {
      id: 1,
      username: 'LKRN',
      email: 'aaa@gmail.com',
      avatar: '',
   },
};

export const UserSlice = createSlice({
   name: 'UserSlice',
   initialState,
   reducers: {
      setMe: (state, action: PayloadAction<IUser>) => {
         state.me = action.payload;
      },
   },
});

export default UserSlice.reducer;

export const { setMe } = UserSlice.actions;
