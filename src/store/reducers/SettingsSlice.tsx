import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ruImg from './assets/ru.png';
import enImg from './assets/en.png';
import zhImg from './assets/zh.png';
import kkImg from './assets/kk.png';
import koImg from './assets/ko.png';
import beImg from './assets/be.png';
import ukImg from './assets/uk.png';
export interface IAuthState {
   lang: TLanguage;
   theme: TTheme;
   langs: ILang[];
   country: string;
}

export type TLanguage = 'ru' | 'en' | 'be' | 'zh' | 'kk' | 'ko' | 'uk';
export type TTheme = 'dark' | 'light';

const initialState: IAuthState = {
   // isAuth: !!localStorage.getItem(TOKEN),
   lang: 'en',
   theme: 'light',
   langs: [
      { value: 'en', text: 'English', img: enImg },
      { value: 'ru', text: 'Russian', img: ruImg },
      { value: 'zh', text: 'Chinese ', img: zhImg },
      { value: 'kk', text: 'Kazakh', img: kkImg },
      { value: 'ko', text: 'Korean', img: koImg },
      { value: 'be', text: 'Belarussian', img: beImg },
      { value: 'uk', text: 'Ukrainian', img: ukImg },
   ],
   country: 'USA',
};

interface ILang {
   value: TLanguage;
   text: string;
   img: string;
}

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
      setCountry: (state, action: PayloadAction<string>) => {
         state.country = action.payload;
      },
   },
});

export default SettingsSlice.reducer;

export const { setTheme, setLang, setCountry } = SettingsSlice.actions;
