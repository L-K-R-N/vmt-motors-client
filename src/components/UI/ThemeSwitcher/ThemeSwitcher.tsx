import { FC, useEffect } from 'react';
import cl from './ThemeSwitcher.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setTheme } from '@/store/reducers/SettingsSlice';
import { FaMoon } from 'react-icons/fa';
import { PiSunHorizonFill } from 'react-icons/pi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
export type TFieldType = 'input' | 'textarea';
interface Props {}

export const ThemeSwitcher: FC<Props> = () => {
   const { theme } = useAppSelector((state) => state.SettingsReducer);
   const dispatch = useAppDispatch();
   useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
   }, [theme]);
   return (
      <div
         className={[
            cl.themeSwitcher,
            theme === 'dark' ? cl.light : cl.dark,
         ].join(' ')}
         onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
      >
         {/* <span className={cl.themeSwitcher__circle}></span> */}
         <PiSunHorizonFill className={cl.sun} />
         <FaMoon className={cl.moon} />
      </div>
   );
};
