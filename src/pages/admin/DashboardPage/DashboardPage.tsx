import { useState } from 'react';
import cl from './DashboardPage.module.scss';
import { useHideFooter } from '@/hooks/useLayout';
import { IUser } from '@/models/User.types';
import { Activity } from '@/components/layout/Activity/Activity';
import { useAppSelector } from '@/hooks/useAppSelector';
import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';

interface Props {}

const DashboardPage: React.FC<Props> = () => {
   useHideFooter();
   const [search, setSearch] = useState('');
   const { products } = useAppSelector((state) => state.ProductsReducer);
   const handleFilterUsers = (users: IUser) => {};
   return (
      <div className={cl.page}>
         <ul className={cl.dashboard}>
            {products.filter((p) => p.moderated)
               ? products
                    .filter((p) => p.moderated)
                    .map((p) => <AdvertCard advert={p} />)
               : 'Нет объявлений для проверки'}
         </ul>
         <Activity />
      </div>
   );
};

export default DashboardPage;
