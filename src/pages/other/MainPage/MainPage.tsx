import { Products } from '@/components/layout/Products/Products';
import cl from './MainPage.module.scss';
import { useHideFooter } from '@/hooks/useLayout';
import { useEffect } from 'react';
import { get_products } from '@/api/public.api';

interface Props {}

const MainPage: React.FC<Props> = () => {
   useHideFooter();
   useEffect(() => {
      console.log(get_products());
   }, []);
   return (
      <div className={cl.container}>
         {/* <ServicesControl /> */}

         <Products />
      </div>
   );
};

export default MainPage;
