import { FC } from 'react';
import cl from './AdvertCard.module.scss';
import { IDates } from '@/models/Advert.types';
import ownerIcon from './assets/owner.svg';
import { FaStar } from 'react-icons/fa';
import { IProduct } from '@/store/reducers/ProductsSlice';
import { useNavigate } from 'react-router-dom';
export type TFieldType = 'input' | 'textarea';

interface Props {
   advert: IProduct;
}

export const AdvertCard: FC<Props> = ({ advert }) => {
   const navigate = useNavigate();
   return (
      <div
         className={cl.advert}
         onClick={() => navigate(`/catalog/buy/${advert?.id}`)}
      >
         <img
            className={cl.advertImg}
            // src={advert.}
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
               <div className={cl.advertFooter__boosts}></div>
            </div>
         </div>
      </div>
   );
};
