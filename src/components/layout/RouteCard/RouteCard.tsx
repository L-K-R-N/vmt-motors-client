import cl from './RouteCard.module.scss';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { FC, useEffect } from 'react';
import { IRoute } from '@/store/reducers/RoutesSlice';
import { FiTrash2 } from 'react-icons/fi';
import { MdOutlinePushPin } from 'react-icons/md';
interface Props {
   route: IRoute;
}

export const RouteCard: FC<Props> = ({ route }) => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const handleClick = () => {
      navigate(`/routes/${route.id}`);
   };

   useEffect(() => {
      console.log(route.end, route.start);
   }, [route]);
   return (
      <div className={cl.card} onClick={handleClick}>
         <div className={cl.cardHeader}>
            <h5 className={cl.title}>{route.title}</h5>
            <span className={cl.price}>{route.price} р</span>
         </div>
         <p className={cl.stages}>
            {route?.start} - {route?.end}
            <span>1 стадия</span>
         </p>
         <div className={cl.cardControl}>
            <button title="Закрепить маршрут" className={cl.pinBtn}>
               <MdOutlinePushPin />
            </button>
            <button title="Удалить маршрут" className={cl.settingsBtn}>
               <FiTrash2 />
            </button>
         </div>
      </div>
   );
};
