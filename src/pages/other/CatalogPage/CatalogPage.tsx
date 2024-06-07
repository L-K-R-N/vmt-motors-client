import { FilterForm } from '@/components/layout/FilterForm/FilterForm';
import cl from './CatalogPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import CatalogService from '@/api/services/ProductService';
import { useEffect } from 'react';
import { Products } from '@/components/layout/Products/Products';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

interface Props {}

const CatalogPage: React.FC<Props> = () => {
   useHideSidebar();
   const dispatch = useAppDispatch();
   const { products } = useAppSelector((state) => state.ProductsReducer);

   const fetchProducts = async () => {
      const response = await CatalogService.getProducts();
      response.data;
      if (response.status === 200) {
         console.log(response);
         return response.data;
      }
   };

   useEffect(() => {
      fetchProducts();
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
