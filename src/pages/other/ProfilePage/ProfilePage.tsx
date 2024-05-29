import cl from './ProfilePage.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import defaultAvatar from './assets/defaultAvatar.jpg';
import { useHideFooter } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { FiLogOut } from 'react-icons/fi';
import { useLogout } from '@/hooks/useLogout';
import { Logistics } from '@/components/layout/Logistics/Logistics';
interface Props {}

interface IProfileMenuItem {
   id: number;
   title: string;
   body: ReactNode;
}

const sellerProfileMenuItems: IProfileMenuItem[] = [
   {
      id: 1,
      title: 'Личные данные',
      body: <div></div>,
   },
   {
      id: 2,
      title: 'Статистика',
      body: <div></div>,
   },
   {
      id: 3,
      title: 'Логистика',
      body: <Logistics />,
   },
];

const userProfileMenuItems: IProfileMenuItem[] = [
   {
      id: 1,
      title: 'Личные данные',
      body: <div></div>,
   },
   {
      id: 2,
      title: 'Статистика',
      body: <div></div>,
   },
   {
      id: 3,
      title: 'История заказов',
      body: <div></div>,
   },
];
const ProfilePage: React.FC<Props> = () => {
   const [isEditPassword, setIsEditPassword] = useState(false);
   const { me } = useAppSelector((state) => state.UserReducer);
   const { isSeller } = useAppSelector((state) => state.AuthReducer);
   const [selectedItemId, setSelecteItemdId] = useState<number>(1);

   useHideFooter();

   const handleSelectItem = (item: IProfileMenuItem) => {
      setSelecteItemdId(item.id);
   };
   const handleEditPassword = () => {
      setIsEditPassword(true);
   };
   const handleLogout = useLogout();
   return (
      <div className={cl.profile}>
         <div className={cl.content}>
            <div className={cl.left}>
               <img
                  className={cl.avatar}
                  src={me.avatar ? me.avatar : defaultAvatar}
                  alt="Ваш аватар"
               />
               <h5 className={cl.username}>
                  {me.username ? me.username : `User${me.id}`}
                  <span>{isSeller ? 'Продавец' : 'Покупатель'}</span>
               </h5>
            </div>
            <div className={cl.info}>
               <div className={cl.infoHeader}>
                  <h3 className={cl.title}>Профиль</h3>
                  <button
                     className={cl.logoutBtn}
                     title="Выйти"
                     onClick={handleLogout}
                  >
                     Выйти
                     <FiLogOut />
                  </button>
               </div>
               <div className={cl.infoMain}>
                  <div className={cl.infoMainMenu}>
                     {isSeller
                        ? sellerProfileMenuItems.map((item) => (
                             <p
                                className={
                                   item.id === selectedItemId ? cl.active : ''
                                }
                                onClick={() => handleSelectItem(item)}
                                key={item.id}
                             >
                                {item.title}
                             </p>
                          ))
                        : userProfileMenuItems.map((item) => (
                             <p
                                className={
                                   item.id === selectedItemId ? cl.active : ''
                                }
                                onClick={() => handleSelectItem(item)}
                                key={item.id}
                             >
                                {item.title}
                             </p>
                          ))}
                  </div>
                  <div className={cl.infoMainBody}>
                     {isSeller
                        ? sellerProfileMenuItems.map((item) => (
                             <div
                                className={
                                   item.id === selectedItemId ? cl.active : ''
                                }
                             >
                                {item.body}
                             </div>
                          ))
                        : userProfileMenuItems.map((item) => <>{item.body}</>)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;
