import { Link, useLocation } from 'react-router-dom';
import cl from './Sidebar.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLayoutEffect, useState } from 'react';
import { RiMenu3Fill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
interface Props {}

export const navList = [
   {
      id: 0,
      title: 'dashboard',
      to: 'admin/dashboard',
   },
   {
      id: 1,
      title: 'list_of_users',
      to: 'admin/users-list',
   },
];

// interface ISidebarItem {
//    id: number;
//    title: string;
//    icon: ReactNode;
//    to: string;
// }

export const Sidebar: React.FC<Props> = () => {
   const { isShowSidebar } = useAppSelector((state) => state.LayoutReducer);
   // const isBlanket = useMediaQuery('(maxWidth: 1024px)');
   const [selectedItemId, setSelectedItemId] = useState<null | number>(null);
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();

   useLayoutEffect(() => {
      const selectedItem = navList.find(
         (link) => `/${link.to}` === location.pathname,
      );

      console.log(selectedItem, navList);

      setSelectedItemId(selectedItem ? selectedItem.id : null);
   }, [location]);

   const { t } = useTranslation();

   return (
      <>
         {isShowSidebar && (
            <div className={cl.sidebar}>
               <nav className={cl.nav}>
                  <h3 className={cl.sidebar__title}>VMT MOTORS</h3>
                  <ul className={cl.links}>
                     {navList?.map((link) => (
                        <li key={link.id}>
                           <Link
                              to={link.to}
                              key={link.id}
                              className={[
                                 cl.link,
                                 link.id === selectedItemId ? cl.active : '',
                              ].join(' ')}
                           >
                              <p className={cl.title}>{t(link.title)}</p>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </nav>
            </div>
         )}
      </>
   );
};
