import cl from './Products.module.scss';

import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
import { FC } from 'react';
import { IProduct } from '@/api/models/Products';

interface Props {
   products: IProduct[];
}
export const Products: FC<Props> = ({ products }) => {
   return (
      <>
         <div className={cl.wrapper}>
            <div className={cl.cardList}>
               {products.length && (
                  products.map((p) => <AdvertCard advert={p} key={p.id} />)
               ) }
            </div>
         </div>
      </>
   );
};
