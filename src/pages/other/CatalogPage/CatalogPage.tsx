import { FilterForm } from '@/components/layout/FilterForm/FilterForm';
import cl from './CatalogPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import CatalogService from '@/api/services/ProductService';
import { useEffect } from 'react';
import { Products } from '@/components/layout/Products/Products';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
   setFiltredProducts,
   setProducts,
} from '@/store/reducers/ProductsSlice';
import ProductService from '@/api/services/ProductService';

interface Props {}

const CatalogPage: React.FC<Props> = () => {
   useHideSidebar();
   const dispatch = useAppDispatch();
   const { products } = useAppSelector((state) => state.ProductsReducer);

   const handleGetProducts = async (params: IParams) => {
      try {
         const response = await ProductService.getAllProducts(params);

         dispatch(setProducts(response.data));
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      handleGetProducts({
         page: 0,
         size: 50,
      });
      dispatch(setFiltredProducts(products));
   }, []);
   return (
      <div className={cl.ads}>
         <div className={cl.filterForm}>
            <FilterForm />
         </div>
         <Products />
      </div>
   );
};

export default CatalogPage;
