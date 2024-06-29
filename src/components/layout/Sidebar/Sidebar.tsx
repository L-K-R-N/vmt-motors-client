import { Link, useLocation } from 'react-router-dom';
import cl from './Sidebar.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLayoutEffect, useState } from 'react';
import { RiMenu3Fill } from 'react-icons/ri';
interface Props {}

export const navList = [
   {
      id: 0,
      title: 'DASHBOARD',
      to: 'admin/dashboard',
   },
   {
      id: 1,
      title: 'LIST OF USERS',
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
                              <p className={cl.title}>{link.title}</p>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </nav>
               <button
                  title="Toggle admin menu"
                  className={cl.controlBtn}
                  onClick={() => setIsOpen(!isOpen)}
               >
                  <RiMenu3Fill />
               </button>
            </div>
         )}
      </>
   );
};
