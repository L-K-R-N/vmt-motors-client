import cl from './DashboardPage.module.scss';
import { useHideFooter } from '@/hooks/useLayout';
import { Activity } from '@/components/layout/Activity/Activity';
import { useAppSelector } from '@/hooks/useAppSelector';
import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
import ProductService from '@/api/services/ProductService';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setModeratedProducts } from '@/store/reducers/ProductsSlice';

interface Props {}

const DashboardPage: React.FC<Props> = () => {
   useHideFooter();
   const dispatch = useAppDispatch();

   const { moderatedProducts } = useAppSelector(
      (state) => state.ProductsReducer,
   );

   const handleGetModeratedProducts = async (params: IParams) => {
      try {
         const response = await ProductService.getAllModeratedProducts(params);

         dispatch(setModeratedProducts(response.data));
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      handleGetModeratedProducts({
         page: 0,
         size: 50,
      });
   }, []);

   return (
      <div className={cl.page}>
         <ul className={cl.dashboard}>
            {moderatedProducts.length ? (
               moderatedProducts.map((p) => <AdvertCard advert={p} />)
            ) : (
               <li className={cl.no_products}>Нет объявлений для проверки</li>
            )}
         </ul>
         <Activity />
      </div>
   );
};

export default DashboardPage;
