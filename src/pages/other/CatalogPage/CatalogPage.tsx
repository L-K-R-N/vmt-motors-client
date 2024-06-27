import { FilterForm } from '@/components/layout/FilterForm/FilterForm';
import cl from './CatalogPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useLayoutEffect } from 'react';
import { Products } from '@/components/layout/Products/Products';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setProducts, setProductsCount } from '@/store/reducers/ProductsSlice';
import ProductService from '@/api/services/ProductService';
import { ISearchProductsRequest } from '@/api/models/Products';
import { CarsLine } from '@/components/layout/CarsLine/CarsLine';

interface Props {}

const CatalogPage: React.FC<Props> = () => {
   useHideSidebar();
   const dispatch = useAppDispatch();
   const { products, productsCount } = useAppSelector(
      (state) => state.ProductsReducer,
   );

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
         <div className={cl.slider}>
            <CarsLine />
         </div>
         <div className={cl.filterForm}>
            <FilterForm />
         </div>
         <div className={cl.wrapper}>
            <div className={cl.panel}>
               <span className={cl.productsCount}>{productsCount} ads</span>
            </div>
            <Products products={products} />
         </div>
      </div>
   );
};

export default CatalogPage;
