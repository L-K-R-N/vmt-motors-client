import { useAppSelector } from '@/hooks/useAppSelector';
import cl from './Products.module.scss';

import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
export const Products = () => {
   const { filtredProducts, products } = useAppSelector(
      (state) => state.ProductsReducer,
   );


   

   return (
      <>
         <div className={cl.wrapper}>
            <div className={cl.cardList}>
               {filtredProducts.length ? (
                  filtredProducts.map((p) => (
                     <AdvertCard advert={p} key={p.id} />
                  ))
               ) : products.length ? (
                  products.map((p) => <AdvertCard advert={p} key={p.id} />)
               ) : (
                  <h3 className={cl.errTitle}>Товары не найдены</h3>
               )}
            </div>
         </div>
      </>
   );
};
