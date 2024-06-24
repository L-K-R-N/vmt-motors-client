import { Link, useNavigate } from 'react-router-dom';
import cl from './Header.module.scss';
import logo from './assets/logo.svg';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { Wrapper } from '../Wrapper/Wrapper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button } from '@/components/UI/Button/Button';
import plusIcon from './assets/plus.svg';
import userIcon from './assets/user.svg';
import { TLanguage, setLang, setTheme } from '@/store/reducers/SettingsSlice';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import { FaMoon } from 'react-icons/fa';
import { IoSunny } from 'react-icons/io5';
import { FaSun } from 'react-icons/fa6';
import { PiSunHorizonFill } from 'react-icons/pi';
import { PiSunDimFill } from 'react-icons/pi';
import { ThemeSwitcher } from '@/components/UI/ThemeSwitcher/ThemeSwitcher';
interface Props {}

export const Header: React.FC<Props> = () => {
   const { isShowHeader } = useAppSelector((state) => state.LayoutReducer);
   const { t } = useTranslation();
   // const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { me, isAdmin } = useAppSelector((state) => state.UserReducer);
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { lang, theme, langs } = useAppSelector(
      (state) => state.SettingsReducer,
   );

   const [isLangsOpen, setIsLangsOpen] = useState(false);
   const [authMenuItems, setAuthMenuItems] = useState([
      {
         text: 'about',
         to: 'about',
      },
      {
         text: 'catalog',
         to: 'catalog',
      },
      {
         text: 'Cart',
         to: '/favourites',
      },

      {
         text: 'chats',
         to: 'chats',
      },
   ]);
   const [adminMenuItems, setAdminMenuItems] = useState([
      {
         text: 'about',
         to: 'about',
      },
      {
         text: 'catalog',
         to: 'catalog',
      },
      {
         text: 'Cart',
         to: '/favourites',
      },

      {
         text: 'admin',
         to: 'admin/dashboard',
      },
      {
         text: 'chats',
         to: 'chats',
      },
   ]);
   const [unAuthMenuItems, setUnAuthMenuItems] = useState([
      {
         text: 'about',
         to: 'about',
      },
      {
         text: 'catalog',
         to: 'catalog',
      },
   ]);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleChangeLang = (newLang: TLanguage) => {
      dispatch(setLang(newLang));

      changeLanguage(newLang);
      setIsLangsOpen(false);
   };

   return (
      <>
         {isShowHeader && (
            <header className={cl.header}>
               <Wrapper>
                  <div className={cl.header__content}>
                     <Link to={'/about'} className={cl.logo}>
                        <img
                           src={logo}
                           alt="logo"
                           width={67}
                           className={cl.logo__img}
                        />
                     </Link>

                     <Menu
                        items={
                           isAuth && isAdmin
                              ? adminMenuItems
                              : isAuth
                                ? authMenuItems
                                : unAuthMenuItems
                        }
                     />

                     <div className={cl.header__control}>
                        {isAuth && (
                           <Button
                              title="Submit an ad"
                              type="button"
                              onClick={() => navigate('add')}
                           >
                              <div>
                                 <img src={plusIcon} alt="" />
                                 <span>{t('submit_an_ad')}</span>
                              </div>
                           </Button>
                        )}
                        <div className={cl.lang}>
                           <span
                              className={cl.lang_current}
                              onPointerEnter={() => setIsLangsOpen(true)}
                              onPointerLeave={() => setIsLangsOpen(false)}
                              onClick={() =>
                                 setIsLangsOpen(isLangsOpen ? false : true)
                              }
                           >
                              <span className={cl.lang_text}>{lang}</span>{' '}
                              <img
                                 src={langs.find((l) => l.value === lang)?.img}
                                 alt=""
                              />
                           </span>
                           <ul
                              className={[
                                 cl.lang_list,
                                 isLangsOpen ? cl.open : '',
                              ].join(' ')}
                              onPointerEnter={() => setIsLangsOpen(true)}
                              onPointerLeave={() => setIsLangsOpen(false)}
                           >
                              {langs.map((lang) => (
                                 <li
                                    className={cl.lang_item}
                                    key={lang.value}
                                    onClick={() => handleChangeLang(lang.value)}
                                 >
                                    {lang.value}
                                    <img src={lang.img} alt="" />
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <ThemeSwitcher />
                        {isAuth ? (
                           <Link
                              to={`/profile/${me?.id}`}
                              className={cl.header__profile}
                           >
                              <img src={userIcon} alt="" />
                              <span>{me?.username}</span>
                           </Link>
                        ) : (
                           <div className={cl.auth__btns}>
                              <Link to={'/signin'}>{t('Login')}</Link>
                              <Link to={'/signup'}>{t('signup')}</Link>
                           </div>
                        )}
                     </div>
                  </div>
               </Wrapper>
            </header>
         )}
      </>
   );
};
