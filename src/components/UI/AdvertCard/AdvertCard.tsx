import { FC } from 'react';
import cl from './AdvertCard.module.scss';
import ownerIcon from './assets/owner.svg';
import { FaStar } from 'react-icons/fa';
import { IProduct } from '@/store/reducers/ProductsSlice';
import { useNavigate } from 'react-router-dom';
import defaultPhoto from './assets/defaultPhoto.jpg';
export type TFieldType = 'input' | 'textarea';

interface Props {
   advert: IProduct;
}

export const AdvertCard: FC<Props> = ({ advert }) => {
   const navigate = useNavigate();
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
                  <span>Today</span>
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
