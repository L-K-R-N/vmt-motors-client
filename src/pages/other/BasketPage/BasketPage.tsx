import cl from './BasketPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useLayoutEffect } from 'react';
import { Products } from '@/components/layout/Products/Products';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setBasketProducts } from '@/store/reducers/ProductsSlice';
import ProductService from '@/api/services/ProductService';
import { MdProductionQuantityLimits } from 'react-icons/md';
interface Props {}

const BasketPage: React.FC<Props> = () => {
   useHideSidebar();
   const dispatch = useAppDispatch();
   const { products, basketProducts } = useAppSelector(
      (state) => state.ProductsReducer,
   );

   const handleGetProducts = () => {
      const response = ProductService.getProductsInBasket('old', {
         limit: 50,
      }).then((res) => {
         dispatch(
            setBasketProducts(res.data.map((resItem) => resItem.commodity)),
         );
         console.log(res.data.map((resItem) => resItem.commodity));
      });
   };

   // useEffect(() => {
   //    dispatch(setProducts(filtredProducts));
   // }, [filtredProducts]);

   useLayoutEffect(() => {
      // handleGetProducts({
      //    page: 0,
      //    size: 50,
      // });
      handleGetProducts();

      return () => {
         dispatch(setBasketProducts([]));
      };
   }, []);
   return (
      <div className={cl.ads}>
         <div className={cl.wrapper}>
            {basketProducts?.length ? (
               <Products products={basketProducts} />
            ) : (
               <div className={cl.noProducts}>
                  <MdProductionQuantityLimits />В корзине пока пусто
               </div>
            )}
         </div>
      </div>
   );
};

export default BasketPage;
