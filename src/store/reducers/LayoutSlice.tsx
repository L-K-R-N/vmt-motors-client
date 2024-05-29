import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
   isShowHeader: boolean;
   isShowSidebar: boolean;
   isShowFooter: boolean;
}

const initialState: IAuthState = {
   isShowHeader: false,
   isShowSidebar: false,
   isShowFooter: false,
};

export const AuthSlice = createSlice({
   name: 'LayoutSlice',
   initialState,
   reducers: {
      setShowHeader: (state, action: PayloadAction<boolean>) => {
         state.isShowHeader = action.payload;
      },
      setShowSidebar: (state, action: PayloadAction<boolean>) => {
         state.isShowSidebar = action.payload;
      },
      setShowFooter: (state, action: PayloadAction<boolean>) => {
         state.isShowFooter = action.payload;
      },
   },
});

export default AuthSlice.reducer;

export const { setShowHeader, setShowSidebar, setShowFooter } =
   AuthSlice.actions;
