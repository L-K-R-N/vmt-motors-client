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

interface Props {}

export const Header: React.FC<Props> = () => {
   const { isShowHeader } = useAppSelector((state) => state.LayoutReducer);
   const { t } = useTranslation();
   // const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { me } = useAppSelector((state) => state.UserReducer);
   const { lang, theme, langs } = useAppSelector(
      (state) => state.SettingsReducer,
   );
   const [isLangsOpen, setIsLangsOpen] = useState(false);
   const [authMenuItems, setAuthMenuItems] = useState([
      {
         text: 'catalog',
         to: 'vmt-motors-client/adverts',
      },
      {
         text: 'about',
         to: 'vmt-motors-client/about',
      },
      {
         text: 'profile',
         to: 'vmt-motors-client/profile',
      },
      {
         text: 'admin',
         to: 'vmt-motors-client/admin/dashboard',
      },
      {
         text: 'chats',
         to: 'vmt-motors-client/chats',
      },
   ]);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleChangeLang = (newLang: TLanguage) => {
      dispatch(setLang(newLang));

      changeLanguage(newLang);
      setIsLangsOpen(false);
   };

   useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
   }, [theme]);

   return (
      <>
         {isShowHeader && (
            <header className={cl.header}>
               <Wrapper>
                  <div className={cl.header__content}>
                     <Link to={'/vmt-motors-client/about'} className={cl.logo}>
                        <img
                           src={logo}
                           alt="logo"
                           width={67}
                           className={cl.logo__img}
                        />
                     </Link>

                     <Menu items={authMenuItems} />

                     <div className={cl.header__control}>
                        <Button
                           title="Submit an ad"
                           type="button"
                           onClick={() => navigate('vmt-motors-client/add')}
                        >
                           <div>
                              <img src={plusIcon} alt="" />
                              <span>{t('submit_an_ad')}</span>
                           </div>
                        </Button>
                        <div className={cl.lang}>
                           <span
                              className={cl.lang_current}
                              onPointerEnter={() => setIsLangsOpen(true)}
                              onPointerLeave={() => setIsLangsOpen(false)}
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
                        <div
                           className={[
                              cl.themeSwitcher,
                              theme === 'dark' ? cl.active : '',
                           ].join(' ')}
                           onClick={() =>
                              dispatch(
                                 setTheme(theme === 'dark' ? 'light' : 'dark'),
                              )
                           }
                        >
                           <span className={cl.themeSwitcher__circle}></span>
                        </div>
                        <Link
                           to={'/vmt-motors-client/profile'}
                           className={cl.header__profile}
                        >
                           <img src={userIcon} alt="" />
                           <span>{me?.username}</span>
                        </Link>
                     </div>
                  </div>
               </Wrapper>
            </header>
         )}
      </>
   );
};
