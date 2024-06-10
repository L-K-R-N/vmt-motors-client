import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
   lang: TLanguage;
   theme: TTheme;
}

export type TLanguage = 'ru' | 'en' | 'be' | 'zh' | 'kk' | 'ko' | 'uk';
export type TTheme = 'dark' | 'light';

const initialState: IAuthState = {
   // isAuth: !!localStorage.getItem(TOKEN),
   lang: 'en',
   theme: 'light',
};

export const SettingsSlice = createSlice({
   name: 'SettingsSlice',
   initialState,
   reducers: {
      setTheme: (state, action: PayloadAction<TTheme>) => {
         state.theme = action.payload;
      },
      setLang: (state, action: PayloadAction<TLanguage>) => {
         state.lang = action.payload;
      },
   },
});

export default SettingsSlice.reducer;

export const { setTheme, setLang } = SettingsSlice.actions;
