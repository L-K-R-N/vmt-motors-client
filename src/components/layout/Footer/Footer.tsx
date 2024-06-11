import cl from './Footer.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { Wrapper } from '../Wrapper/Wrapper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import { TLanguage, setLang } from '@/store/reducers/SettingsSlice';
interface Props {}

export interface INavList {
   name: string;
   items: IItem[];
}

interface IItem {
   name: string;
   link: string;
}

export const Footer: React.FC<Props> = () => {
   const { isShowFooter } = useAppSelector((state) => state.LayoutReducer);
   // const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { t } = useTranslation();
   const { lang, langs } = useAppSelector((state) => state.SettingsReducer);
   const [isLangsOpen, setIsLangsOpen] = useState(false);
   const [navLists, setNavLists] = useState<INavList[]>([
      {
         name: 'Vmt motors',
         items: [
            {
               name: t('about'),
               link: 'about',
            },
            {
               name: t('contact'),
               link: 'contact',
            },
            {
               name: t('help_faq'),
               link: 'about',
            },
         ],
      },
      {
         name: t('categories'),
         items: [
            {
               name: t('cars'),
               link: 'cars',
            },
            {
               name: t('details'),
               link: 'details',
            },
            {
               name: t('motor_vehicles'),
               link: 'vehicles',
            },
            {
               name: t('equipment'),
               link: 'equipment',
            },
            {
               name: t('consumables'),
               link: 'consumables',
            },
         ],
      },
      {
         name: t('catalog'),
         items: [
            {
               name: t('all_brands'),
               link: 'all',
            },
         ],
      },
      {
         name: t('for_buisness'),
         items: [
            {
               name: t('partner'),
               link: 'partner',
            },
         ],
      },
   ]);
   const dispatch = useAppDispatch();

   const handleChangeLang = (newLang: TLanguage) => {
      dispatch(setLang(newLang));

      changeLanguage(newLang);
      setIsLangsOpen(false);
   };

   useEffect(() => {
      setNavLists([
         {
            name: 'Vmt motors',
            items: [
               {
                  name: t('about'),
                  link: 'about',
               },
               {
                  name: t('contact'),
                  link: 'contact',
               },
               {
                  name: t('help_faq'),
                  link: 'about',
               },
            ],
         },
         {
            name: t('categories'),
            items: [
               {
                  name: t('cars'),
                  link: 'cars',
               },
               {
                  name: t('details'),
                  link: 'details',
               },
               {
                  name: t('motor_vehicles'),
                  link: 'vehicles',
               },
               {
                  name: t('equipment'),
                  link: 'equipment',
               },
               {
                  name: t('consumables'),
                  link: 'consumables',
               },
            ],
         },
         {
            name: t('catalog'),
            items: [
               {
                  name: t('all_brands'),
                  link: 'all',
               },
            ],
         },
         {
            name: t('for_business'),
            items: [
               {
                  name: t('partner'),
                  link: 'partner',
               },
            ],
         },
      ]);
   }, [lang]);
   return (
      <>
         {isShowFooter && (
            <footer className={cl.footer}>
               <Wrapper>
                  <div className={cl.footer__content}>
                     <div className={cl.footer__container}>
                        <nav className={cl.footer__nav}>
                           {navLists.map((list) => (
                              <div
                                 className={cl.footer__listContainer}
                                 key={list.name}
                              >
                                 <h5 className={cl.footer__listName}>
                                    {list.name}
                                 </h5>
                                 <ul className={cl.footer__list}>
                                    {list.items.map((item) => (
                                       <li
                                          className={cl.footer__listItem}
                                          key={item.link}
                                       >
                                          {item.name}
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           ))}
                        </nav>
                        <section className={cl.footer__settings}>
                           <h5 className={cl.footer__settingsTitle}>
                              {t('settings')}
                           </h5>
                           <div className={cl.footer__settingsMain}>
                              <div className={cl.lang}>
                                 <span
                                    className={cl.lang_current}
                                    onPointerEnter={() => setIsLangsOpen(true)}
                                    onPointerLeave={() => setIsLangsOpen(false)}
                                 >
                                    <span className={cl.lang_text}>{lang}</span>{' '}
                                    <img
                                       src={
                                          langs.find((l) => l.value === lang)
                                             ?.img
                                       }
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
                                          onClick={() =>
                                             handleChangeLang(lang.value)
                                          }
                                       >
                                          {lang.value}
                                          <img src={lang.img} alt="" />
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </section>
                     </div>
                     <p className={cl.footer__rights}>
                        <span>© {t('all_rights_reserved')}.</span>{' '}
                        <span>vtmmotors@co.com</span>
                     </p>
                  </div>
               </Wrapper>
            </footer>
         )}
      </>
   );
};
