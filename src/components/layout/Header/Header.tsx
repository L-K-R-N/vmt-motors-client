import { Link, useNavigate } from 'react-router-dom';
import cl from './Header.module.scss';
import logo from './assets/logo.svg';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ChangeEvent, useEffect, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { Wrapper } from '../Wrapper/Wrapper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button } from '@/components/UI/Button/Button';
import plusIcon from './assets/plus.svg';
import userIcon from './assets/user.svg';
import { TLanguage, setLang } from '@/store/reducers/SettingsSlice';
import { useTranslation } from 'react-i18next';
interface Props {}

export const authMenuItems = [
   {
      text: 'About',
      to: 'about',
   },
   {
      text: 'Catalog',
      to: 'adverrts',
   },
   {
      text: 'Profile',
      to: 'profile',
   },
];

interface ISelectItem {
   value: TLanguage;
   text: string;
}

export const Header: React.FC<Props> = () => {
   const { isShowHeader } = useAppSelector((state) => state.LayoutReducer);
   const { i18n, t } = useTranslation();
   // const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { me } = useAppSelector((state) => state.UserReducer);
   const { lang, theme } = useAppSelector((state) => state.SettingsReducer);
   const [authMenuItems, setAuthMenuItems] = useState([
      {
         text: t('advertisment'),
         to: 'adverts',
      },
      {
         text: t('about'),
         to: 'about',
      },
      {
         text: t('profile'),
         to: 'profile',
      },
      {
         text: 'Admin',
         to: 'admin/dashboard',
      },
   ]);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [langs, setLangs] = useState<ISelectItem[]>([
      { value: 'en', text: 'English' },
      { value: 'ru', text: 'Russian' },
      { value: 'zh', text: 'Chinese ' },
      { value: 'kk', text: 'Kazakh' },
      { value: 'ko', text: 'Korean' },
      { value: 'be', text: 'Belarussian' },
      { value: 'uk', text: 'Ukrainian' },
   ]);

   const handleChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setLang(e.target.value as TLanguage));

      i18n.changeLanguage(e.target.value);

      setAuthMenuItems([
         {
            text: t('advertisment'),
            to: 'ads',
         },
         {
            text: t('about'),
            to: 'about',
         },
         {
            text: t('catalog'),
            to: 'catalog',
         },
         {
            text: t('profile'),
            to: 'profile',
         },
      ]);
   };

   useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
   }, [theme]);

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

                     <Menu items={authMenuItems} />

                     <div className={cl.header__control}>
                        <Button
                           title="Submit an ad"
                           type="button"
                           onClick={() => navigate('add')}
                        >
                           <div>
                              <img src={plusIcon} alt="" />
                              {t('submit_an_ad')}
                           </div>
                        </Button>
                        <div className={cl.header__lang}>
                           <select
                              title="Change language"
                              name="Change language"
                              id=""
                              onChange={handleChangeLang}
                              value={lang}
                           >
                              {langs.map((lang) => (
                                 <option value={lang.value} key={lang.value}>
                                    {lang.text}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <Link to={'/profile'} className={cl.header__profile}>
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
