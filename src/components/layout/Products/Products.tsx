import { useAppSelector } from '@/hooks/useAppSelector';
import cl from './Products.module.scss';

import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
import { useAppDispatch } from '@/hooks/useAppDispatch';
export const Products = () => {
   const dispatch = useAppDispatch();
   const { filtredProducts, products, productsCount } = useAppSelector(
      (state) => state.ProductsReducer,
   );

   return (
      <>
         <div className={cl.wrapper}>
            <div className={cl.panel}>
               <span className={cl.productsCount}>{productsCount} ads</span>
            </div>
            <div className={cl.cardList}>
               {products.length ? (
                  products.map((p) => <AdvertCard advert={p} key={p.id} />)
               ) : (
                  <h3 className={cl.errTitle}>Товары не найдены</h3>
               )}
            </div>
         </div>
      </>
   );
};
