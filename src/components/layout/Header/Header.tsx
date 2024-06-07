import { Link, useNavigate } from 'react-router-dom';
import cl from './Header.module.scss';
import logo from './assets/logo.svg';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ChangeEvent, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { Wrapper } from '../Wrapper/Wrapper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button } from '@/components/UI/Button/Button';
import plusIcon from './assets/plus.svg';
import userIcon from './assets/user.svg';
import { TLanguage, setLang } from '@/store/reducers/SettingsSlice';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
interface Props {}

export const authMenuItems = [
   {
      text: 'Advertisment',
      to: 'ads',
   },
   {
      text: 'About',
      to: 'about',
   },
   {
      text: 'Catalog',
      to: 'catalog',
   },
   {
      text: 'Profile',
      to: 'profile',
   },
];

export const unAuthMenuItems = [
   {
      text: 'About',
      to: 'about',
   },
   {
      text: 'Pricing',
      to: 'pricing',
   },
   {
      text: 'Clients',
      to: 'clients',
   },
   {
      text: 'Blog',
      to: 'blog',
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
   const [isAuth, setIsAuth] = useState(true);
   const [user, setUser] = useState('Artem');
   const { lang } = useAppSelector((state) => state.SettingsReducer);
   const [authMenuItems, setAuthMenuItems] = useState([
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
   const [unAuthMenuItems, setUnAuthMenuItems] = useState([
      {
         text: t('about'),
         to: 'about',
      },
      {
         text: t('pricing'),
         to: 'pricing',
      },
      {
         text: t('clients'),
         to: 'clients',
      },
      {
         text: t('blog'),
         to: 'blog',
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
      setUnAuthMenuItems([
         {
            text: t('about'),
            to: 'about',
         },
         {
            text: t('pricing'),
            to: 'pricing',
         },
         {
            text: t('clients'),
            to: 'clients',
         },
         {
            text: t('blog'),
            to: 'blog',
         },
      ]);
   };

   return (
      <>
         {isShowHeader && (
            <header className={cl.header}>
               <Wrapper>
                  <div className={cl.header__content}>
                     <Link to={isAuth ? '/main' : '/home'} className={cl.logo}>
                        <img
                           src={logo}
                           alt="logo"
                           width={67}
                           className={cl.logo__img}
                        />
                     </Link>

                     {isAuth ? (
                        <Menu items={authMenuItems} />
                     ) : (
                        <Menu items={unAuthMenuItems} />
                     )}
                     {isAuth && (
                        // <div className={cl.profileBlock}>
                        //    <button title="Пункты выдачи" className={cl.mapBtn}>
                        //       <CiMap />
                        //    </button>
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
                                    <option value={lang.value}>
                                       {lang.text}
                                    </option>
                                 ))}
                              </select>
                           </div>
                           <Link to={'/profile'} className={cl.header__profile}>
                              <img src={userIcon} alt="" />
                              <span>{user}</span>
                           </Link>
                        </div>
                     )}
                  </div>
               </Wrapper>
            </header>
         )}
      </>
   );
};
