import { useAppSelector } from '@/hooks/useAppSelector';
import cl from './Products.module.scss';

import { useSearch } from '@/hooks/useSearch';
import { ProductCard } from '../ProductCard/ProductCard';
import { useModal } from '@/hooks/useModal';
import { AddProductModal } from '@/components/modals/AddProductModal/AddProductModal';
import { HiMiniSquaresPlus } from 'react-icons/hi2';
import { Button } from '@/components/UI/Button/Button';
export const Products = () => {
   const { products, productSearch } = useAppSelector(
      (state) => state.ProductsReducer,
   );

   const { isSeller } = useAppSelector((state) => state.AuthReducer);
   const searchedProducts = useSearch(products, productSearch);
   const { isShow, setIsShow, handleOpen } = useModal();
   return (
      <>
         {/* <div className={cl.title}>
				<p>Products</p>
			</div> */}

         <div className={cl.cardList}>
            {isSeller && (
               <Button
                  title="Добавить товар"
                  type="button"
                  onClick={() => handleOpen()}
               >
                  <HiMiniSquaresPlus />
               </Button>
            )}
            {searchedProducts ? (
               searchedProducts.map((service) => (
                  <ProductCard product={service} key={service.id} />
               ))
            ) : (
               <h3 className={cl.errTitle}>Товары не найдены</h3>
            )}
         </div>
         <AddProductModal isShow={isShow} setShow={setIsShow} />
      </>
   );
};
