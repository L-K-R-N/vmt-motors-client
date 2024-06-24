import { FilterForm } from '@/components/layout/FilterForm/FilterForm';
import cl from './BasketPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useLayoutEffect } from 'react';
import { Products } from '@/components/layout/Products/Products';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setProducts, setProductsCount } from '@/store/reducers/ProductsSlice';
import ProductService from '@/api/services/ProductService';
import { ISearchProductsRequest } from '@/api/models/Products';

interface Props {}

const BasketPage: React.FC<Props> = () => {
   useHideSidebar();
   const dispatch = useAppDispatch();
   const { products } = useAppSelector((state) => state.ProductsReducer);

   const handleGetProducts = () => {
      const response = ProductService.getFiltredProducts(
         {} as ISearchProductsRequest,
      ).then((res) => {
         console.log(res.data.result);
         dispatch(setProducts(res.data.result));
         dispatch(setProductsCount(res.data.total));
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
      // dispatch(setFiltredProducts(products));
   }, []);
   return (
      <div className={cl.ads}>
         <div className={cl.wrapper}>
            <Products products={products} />
         </div>
      </div>
   );
};

export default BasketPage;
