import { useAppSelector } from '@/hooks/useAppSelector';
import cl from './Products.module.scss';

import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
export const Products = () => {
   const { products } = useAppSelector((state) => state.ProductsReducer);

   return (
      <>
         {/* <div className={cl.title}>
				<p>Products</p>
			</div> */}

         <div className={cl.wrapper}>
            <div className={cl.cardList}>
               {products ? (
                  products.map((p) => <AdvertCard advert={p} key={p.id} />)
               ) : (
                  <h3 className={cl.errTitle}>Товары не найдены</h3>
               )}
            </div>
         </div>
      </>
   );
};
