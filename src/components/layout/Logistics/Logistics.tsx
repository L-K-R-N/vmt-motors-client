import cl from './Logistics.module.scss';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RouteCard } from '../RouteCard/RouteCard';
import { setRoutes } from '@/store/reducers/RoutesSlice';
import { FiPlus } from 'react-icons/fi';
interface Props {}

export const Logistics: FC<Props> = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { routes } = useAppSelector((state) => state.RoutesReducer);
   const [extraRoutes, setExtraRoutes] = useState(
      routes.filter((route) => route.type === 'extra'),
   );
   const [standartRoutes, setStandarRoutes] = useState(
      routes.filter((route) => route.type === 'standart'),
   );

   const handleAddRoute = (type: 'standart' | 'extra') => {
      const newRouteId = Date.now();
      dispatch(
         setRoutes([
            ...routes,
            {
               id: newRouteId,
               price: null,
               title: `Route${newRouteId}`,
               type: type,
               start: '',
               end: '',
            },
         ]),
         navigate(`/routes/${newRouteId}`),
      );
      // navigate(`/routes/${newRouteId}`);
   };

   useEffect(() => {
      setExtraRoutes(routes.filter((route) => route.type === 'extra'));
      setStandarRoutes(routes.filter((route) => route.type === 'standart'));
   }, [routes]);
   return (
      <div className={cl.logistics}>
         <div className={cl.standart}>
            <h5 className={cl.title}>
               Стандартные маршруты{' '}
               <button
                  title="Добавить стандартный маршрут"
                  onClick={() => handleAddRoute('standart')}
               >
                  <FiPlus />
               </button>
            </h5>
            {standartRoutes.map((route) => (
               <RouteCard route={route} key={route.id} />
            ))}
         </div>
         <div className={cl.extra}>
            <h5 className={cl.title}>
               Экстра маршруты
               <button
                  title="Добавить экстра маршрут"
                  onClick={() => handleAddRoute('extra')}
               >
                  <FiPlus />
               </button>
            </h5>
            {extraRoutes.map((route) => (
               <RouteCard route={route} key={route.id} />
            ))}
         </div>
      </div>
   );
};
