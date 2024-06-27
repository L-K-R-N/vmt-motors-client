import { Link, useNavigate } from 'react-router-dom';
import cl from './Header.module.scss';
import logo from './assets/logo.svg';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { Wrapper } from '../Wrapper/Wrapper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import plusIcon from './assets/plus.svg';
import userIcon from './assets/user.svg';
import { TLanguage, setLang } from '@/store/reducers/SettingsSlice';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import { ThemeSwitcher } from '@/components/UI/ThemeSwitcher/ThemeSwitcher';
import PersonService from '@/api/services/PersonService';
import { toast } from 'react-toastify';
import { setMe } from '@/store/reducers/UserSlice';
interface Props {}

export const Header: React.FC<Props> = () => {
   const { isShowHeader } = useAppSelector((state) => state.LayoutReducer);
   const { t } = useTranslation();
   // const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { me, isAdmin } = useAppSelector((state) => state.UserReducer);
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const headerRef = useRef<HTMLDivElement>(null);

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
         to: 'cart',
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
         to: 'cart',
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

   const handleOpenProfile = () => {
      try {
         const response = PersonService.getMe();

         toast
            .promise(response, {
               error: 'Аккаунт не найден',
            })
            .then((res) => {
               setMe(res.data);
               navigate(`/profile/${res.data.id}`);
            });
      } catch (e) {}
   };

   // useEffect(() => {
      
      
   //    const updateLayout = () => {
   //       if (headerRef.current) {
   //          const headerHeight = headerRef.current.offsetHeight;

   //          document.documentElement.style.setProperty(
   //             '--header-height',
   //             `${headerHeight}px`,
   //          );
   //       }
   //    };

   //    updateLayout();
   //    window.addEventListener('resize', updateLayout);

   //    return () => {
   //       window.removeEventListener('resize', updateLayout);
   //    };
   // }, [headerRef.current]);

   return (
      <>
         {isShowHeader && (
            <header className={cl.header} ref={headerRef}>
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
                        {(isAuth && location.pathname !== '/chats' && location.pathname !== '/add') &&
                           (!location.pathname.includes('admin') && (
                              <button
                                 title="Submit an ad"
                                 type="button"
                                 onClick={() => navigate('add')}
                                 className={cl.submitBtn}
                              >
                                 <div>
                                    <img src={plusIcon} alt="" />
                                    <span>{t('submit_an_ad')}</span>
                                 </div>
                              </button>
                           ))}
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
                           <button
                              onClick={handleOpenProfile}
                              className={cl.header__profile}
                           >
                              <>
                                 <img src={userIcon} alt="" />
                                 <span>{me?.username}</span>
                              </>
                           </button>
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
