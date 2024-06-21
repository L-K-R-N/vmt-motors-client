import { FC, useEffect, useState } from 'react';
import cl from './AdvertCard.module.scss';
import ownerIcon from './assets/owner.svg';
import { FaStar } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { IProduct } from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';
import { IoStarOutline } from 'react-icons/io5';
import {
   setModeratedProducts,
   setMyProducts,
   setProducts,
} from '@/store/reducers/ProductsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { MdOutlineStarBorderPurple500 } from 'react-icons/md';
import { toast } from 'react-toastify';
export type TFieldType = 'input' | 'textarea';
interface Props {
   advert: IProduct;
   isSmall?: boolean;
}

export const AdvertCard: FC<Props> = ({ advert, isSmall }) => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { lang } = useAppSelector((state) => state.SettingsReducer);
   const [locale, setLocale] = useState(enUS);
   const { me, isAdmin } = useAppSelector((state) => state.UserReducer);
   const location = useLocation();
   const [isMyProduct, setIsMyProduct] = useState(false);
   const [isModerating, setIsModerating] = useState(false);
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
      console.log(advert.moderated);
   }, [lang]);

   useEffect(() => {
      setIsModerating(location.pathname === '/admin/dashboard' ? true : false);
      setIsMyProduct(me?.id === advert.personId ? true : false);
   }, []);

   const handleApprove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      try {
         const acceptResponse = ProductService.acceptProduct({
            productId: advert.id,
         });

         toast
            .promise(acceptResponse, {
               success: 'Объявление одобрено!',
               error: {
                  render({ data }) {
                     return `${data}`.includes('403')
                        ? 'У Вас недостаточно прав'
                        : 'Необработанная ошибка';
                  },
               },
            })
            .then((res) => {
               ProductService.getAllModeratedProducts({
                  page: 0,
                  size: 50,
               }).then((moderatedRes) => {
                  dispatch(setModeratedProducts(moderatedRes.data));
               });
            });
      } catch (e) {
         console.log(e);
      }
   };
   const handleReject = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      try {
         const rejectResponse = ProductService.rejectProduct({
            productId: advert.id,
         });

         toast
            .promise(rejectResponse, {
               success: 'Объявление отклонено!',
               error: {
                  render({ data }) {
                     return `${data}`.includes('403')
                        ? 'У Вас недостаточно прав'
                        : 'Необработанная ошибка';
                  },
               },
            })
            .then(() => {
               ProductService.getAllModeratedProducts({
                  page: 0,
                  size: 50,
               }).then((moderatedRes) => {
                  dispatch(setModeratedProducts(moderatedRes.data));
               });
            });

         // dispatch(setProducts(res.data));
      } catch (e) {
         console.log(e);
      }
   };

   const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      try {
      } catch (e) {}
   };

   const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      try {
         const deleteResponse = ProductService.deleteProduct({ productId: advert.id });

         

         toast
            .promise(deleteResponse, {
               success: 'Объявление удалено!',
               error: {
                  render({ data }) {
                     return 'Произошла необработанная ошибка';
                  },
               },
            })
            .then(() => {
               ProductService.getMyProducts({
                  page: 0,
                  size: 50,
               }).then((res) => {
                  dispatch(setMyProducts(res.data));
               });
            });

      } catch (e) {
         console.log(e);
      }
   };

   return (
      <div
         className={[cl.advert, isSmall ? cl.small : ''].join(' ')}
         onClick={() => navigate(`/adverts/buy/${advert.id}`)}
      >
         <img
            className={cl.advertImg}
            src={defaultPhoto}
            alt={`${advert?.name} image`}
         />
         <div className={cl.advertContainer}>
            <div className={cl.advertHeader}>
               <div className={cl.advertHeader__top}>
                  <h4 className={cl.advertHeader__title}>
                     {advert?.name}
                    
                  </h4>
                 
                  <p className={cl.advertHeader__price}>{advert?.price}$</p>
                  <button
                     className={[cl.advertHeader__isFavorite, cl.active].join(
                        ' ',
                     )}
                     title="Добавить в избранное"
                     onClick={handleAddToCart}
                  >
                     <IoStarOutline />
                  </button>
               </div>
               <span className={cl.advertHeader__model}>
                  {advert?.model}
               </span>
               <p className={[cl.advertHeader__desc, cl.no_desc].join(' ')}>{advert?.description ? advert?.description : 'Описание не добавлено'}</p>
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
               {!advert.moderated && isModerating && isAdmin ? (
                  <div className={cl.advertFooter__buttons}>
                     <button className={cl.reject} onClick={handleReject}>
                        REJECT
                     </button>
                     <button className={cl.approve} onClick={handleApprove}>
                        APPROVE
                     </button>
                  </div>
               ) : isMyProduct ? (
                  <div className={cl.advertFooter__buttons}>
                     <button className={cl.reject} onClick={handleDelete}>
                        DELETE
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
