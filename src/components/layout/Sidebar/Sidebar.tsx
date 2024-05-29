import { Link, useLocation, useNavigate } from 'react-router-dom';
import cl from './Sidebar.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ReactNode, useLayoutEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { LuShoppingCart } from 'react-icons/lu';
import { BiSupport } from 'react-icons/bi';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiLogOut } from 'react-icons/fi';
import { IoNewspaperOutline } from 'react-icons/io5';
import { useLogout } from '@/hooks/useLogout';

interface Props {}

export const navList = [
   {
      id: 0,
      title: 'Каталог',
      icon: <IoNewspaperOutline />,
      to: 'main',
   },
   {
      id: 1,
      title: 'Корзина',
      icon: <LuShoppingCart />,
      to: 'cart',
   },
   {
      id: 2,
      title: 'Заказы',
      icon: <TbTruckDelivery />,
      to: 'orders',
   },

   {
      id: 3, //was 3
      title: 'Поддержка',
      icon: <BiSupport />,
      to: 'support',
   },
];

interface ISidebarItem {
   id: number;
   title: string;
   icon: ReactNode;
   to: string;
}

export const Sidebar: React.FC<Props> = () => {
   const { isShowSidebar } = useAppSelector((state) => state.LayoutReducer);
   // const isBlanket = useMediaQuery('(maxWidth: 1024px)');
   const [selectedItemId, setSelectedItemId] = useState<null | number>(null);
   const location = useLocation();

   const handleLogout = useLogout();

   useLayoutEffect(() => {
      const selectedItem = navList.find(
         (link) => `/${link.to}` === location.pathname,
      );

      console.log(selectedItem, navList);

      setSelectedItemId(selectedItem ? selectedItem.id : null);
   }, [location]);

   return (
      <>
         {isShowSidebar && (
            <div className={cl.sidebar}>
               <nav className={cl.nav}>
                  <ul className={cl.links}>
                     {navList.map((link) => (
                        <li key={link.id}>
                           <Link
                              to={link.to}
                              key={link.id}
                              className={[
                                 cl.link,
                                 link.id === selectedItemId ? cl.active : '',
                              ].join(' ')}
                           >
                              {link.icon}
                              <p className={cl.title}>{link.title}</p>
                           </Link>
                        </li>
                     ))}
                     <li className={cl.link} onClick={handleLogout}>
                        <FiLogOut />
                        <p className={cl.title}>Выход</p>
                     </li>
                  </ul>
               </nav>
            </div>
         )}
      </>
   );
};
