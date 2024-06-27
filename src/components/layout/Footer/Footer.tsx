import cl from './Footer.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useRef, useState } from 'react';
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
   const dispatch = useAppDispatch();
   const { lang, langs } = useAppSelector((state) => state.SettingsReducer);
   const [isLangsOpen, setIsLangsOpen] = useState(false);
   const [navLists, setNavLists] = useState<INavList[]>([
      {
         name: 'Vmt motors',
         items: [
            {
               name: 'about',
               link: 'about',
            },
            {
               name: 'contact',
               link: 'contact',
            },
            {
               name: 'help_faq',
               link: 'faq',
            },
         ],
      },
      {
         name: 'categories',
         items: [
            {
               name: 'cars',
               link: 'cars',
            },
            {
               name: 'details',
               link: 'details',
            },
            {
               name: 'motor_vehicles',
               link: 'vehicles',
            },
            {
               name: 'equipment',
               link: 'equipment',
            },
            {
               name: 'consumables',
               link: 'consumables',
            },
         ],
      },
      {
         name: 'catalog',
         items: [
            {
               name: 'all_brands',
               link: 'all',
            },
         ],
      },
      {
         name: 'for_buisness',
         items: [
            {
               name: 'partner',
               link: 'partner',
            },
         ],
      },
   ]);
   const footerRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const updateLayout = () => {
         if (footerRef.current) {
            const footerHeight = footerRef.current.offsetHeight;

            document.documentElement.style.setProperty(
               '--footer-height',
               `${footerHeight}px`,
            );
         }
      };

      updateLayout();
      window.addEventListener('resize', updateLayout);

      return () => {
         window.removeEventListener('resize', updateLayout);
      };
   }, []);

   const handleChangeLang = (newLang: TLanguage) => {
      dispatch(setLang(newLang));

      changeLanguage(newLang);
      setIsLangsOpen(false);
   };

   // useEffect(() => {}, [lang]);
   return (
      <>
         {isShowFooter && (
            <footer className={cl.footer} ref={footerRef}>
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
                                    {t(list.name)}
                                 </h5>
                                 <ul className={cl.footer__list}>
                                    {list.items.map((item) => (
                                       <li
                                          className={cl.footer__listItem}
                                          key={item.link}
                                       >
                                          {t(item.name)}
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
                                    onClick={() =>
                                       setIsLangsOpen(
                                          isLangsOpen ? false : true,
                                       )
                                    }
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
                        <span>vmtmotors@co.com</span>
                     </p>
                  </div>
               </Wrapper>
            </footer>
         )}
      </>
   );
};
