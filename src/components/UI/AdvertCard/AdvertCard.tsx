import { FC, useEffect, useState } from 'react';
import cl from './AdvertCard.module.scss';
import ownerIcon from './assets/owner.svg';
import { FaStar } from 'react-icons/fa';
import { IProduct } from '@/store/reducers/ProductsSlice';
import { useNavigate } from 'react-router-dom';
import defaultPhoto from './assets/defaultPhoto.jpg';
import { Locale, formatDistanceToNow } from 'date-fns';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ru } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
import { ko } from 'date-fns/locale';
import { kk } from 'date-fns/locale';
import { zhCN } from 'date-fns/locale';
import { uk } from 'date-fns/locale';
import { be } from 'date-fns/locale';
import { TLanguage } from '@/store/reducers/SettingsSlice';
export type TFieldType = 'input' | 'textarea';
interface Props {
   advert: IProduct;
}

export const AdvertCard: FC<Props> = ({ advert }) => {
   const navigate = useNavigate();
   const { lang } = useAppSelector((state) => state.SettingsReducer);
   const [locale, setLocale] = useState(enUS);

   const changeLocale = (lang: TLanguage): Locale => {
      let currentLocale = locale;

      switch (lang) {
         case 'ru':
            currentLocale = ru;
            break;
         case 'en':
            currentLocale = enUS;
            break;
         case 'be':
            currentLocale = be;
            break;
         case 'kk':
            currentLocale = kk;
            break;
         case 'ko':
            currentLocale = ko;
            break;
         case 'uk':
            currentLocale = uk;
            break;
         case 'zh':
            currentLocale = zhCN;
            break;
      }

      return currentLocale;
   };

   useEffect(() => {
      setLocale(changeLocale(lang));
   }, [lang]);

   return (
      <div
         className={cl.advert}
         onClick={() => navigate(`/adverts/buy/${advert?.id}`)}
      >
         <img
            className={cl.advertImg}
            src={defaultPhoto}
            alt={`${advert?.name} image`}
         />
         <div className={cl.advertContainer}>
            <div className={cl.advertHeader}>
               <div className={cl.advertHeader__top}>
                  <h4 className={cl.advertHeader__title}>{advert?.name}</h4>
                  <p className={cl.advertHeader__price}>{advert?.price}$</p>
                  <button
                     className={cl.advertHeader__isFavorite}
                     title="Добавить в избранное"
                  >
                     <FaStar />
                  </button>
               </div>
               <span className={cl.advertHeader__model}>
                  {advert?.model.value}
               </span>
               <p className={cl.advertHeader__desc}>{advert?.desc}</p>
               <span
                  className={[
                     cl.advertHeader__isNew,
                     advert?.isNew ? cl.visible : '',
                  ].join(' ')}
               >
                  NEW
               </span>
               <span className={cl.fromOwner}>
                  <img src={ownerIcon} alt="" /> From the owner
               </span>
            </div>
            <div className={cl.advertFooter}>
               <p className={cl.advertFooter__location}>
                  <span>USA</span>
                  <span>
                     {formatDistanceToNow(advert.createdAt, {
                        locale: locale,
                        addSuffix: true,
                     })}
                  </span>
               </p>
               {advert.moderated ? (
                  <div className={cl.advertFooter__buttons}>
                     <button
                        className={cl.reject}
                        onClick={(e) => {
                           e.stopPropagation();
                        }}
                     >
                        REJECT
                     </button>
                     <button
                        className={cl.approve}
                        onClick={(e) => {
                           e.stopPropagation();
                        }}
                     >
                        APPROVE
                     </button>
                  </div>
               ) : (
                  <div className={cl.advertFooter__boosts}></div>
               )}
            </div>
         </div>
      </div>
   );
};
