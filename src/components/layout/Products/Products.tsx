import { useAppSelector } from '@/hooks/useAppSelector';
import cl from './Products.module.scss';

import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
export const Products = () => {
   const { products, filtredProducts } = useAppSelector(
      (state) => state.ProductsReducer,
   );

   return (
      <>
         <div className={cl.wrapper}>
            <div className={cl.cardList}>
               {filtredProducts.length !== 0 ? (
                  filtredProducts.map((p) => (
                     <AdvertCard advert={p} key={p.id} />
                  ))
               ) : (
                  <h3 className={cl.errTitle}>Товары не найдены</h3>
               )}
            </div>
         </div>
      </>
   );
};
