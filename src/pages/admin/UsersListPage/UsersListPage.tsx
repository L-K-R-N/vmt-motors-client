import cl from './UsersListPage.module.scss';
import { useHideFooter } from '@/hooks/useLayout';
import { useEffect, useMemo, useState } from 'react';
import { Activity } from '@/components/layout/Activity/Activity';
import PersonService from '@/api/services/PersonService';

interface Props {}

const UsersListPage: React.FC<Props> = () => {
   useHideFooter();
   const [search, setSearch] = useState('');
   const [users] = useState<{ username: string; role: string }[]>([]);
   const useFilterUsers = (
      users: { username: string; role: string }[],
      search: string,
   ) => {
      const newUsers = useMemo(() => {
         return users.filter((user) => {
            console.log(search, user.username.toLowerCase());
            return user.username.toLowerCase().includes(search.toLowerCase());
         });
      }, [search]);

      return newUsers;
   };
   let filtredUsers = useFilterUsers(users, search);

   const handleSetUsers = () => {
      try {
         const response = PersonService.getAllModerations;
      } catch (e) {
         console.log(e);
      }
   };
   useEffect(() => {
      filtredUsers = users;
   }, []);

   useEffect(() => {
      console.log(search);
   });

   return (
      <div className={cl.page}>
         <div className={cl.usersList}>
            <div className={cl.usersList__header}>
               <h4 className={cl.usersList__title}>VMT MOTORS</h4>
               <input
                  placeholder="SEARCH ADMINISTRATIONS"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            <div className={cl.usersList__main}>
               <div className={cl.usersList__line}>
                  <div className={cl.usersList__column}>STAFF TYPE</div>
                  <div className={cl.usersList__column}>USERNAME</div>
               </div>
               <ul className={cl.usersList__body}>
                  {filtredUsers.length ? (
                     filtredUsers.map((user) => (
                        <li className={cl.usersList__line} key={user.username}>
                           <div className={cl.usersList__column}>
                              {user.role}
                           </div>
                           <div className={cl.usersList__column}>
                              {user.username}
                           </div>
                        </li>
                     ))
                  ) : (
                     <li className={cl.no_products}>
                        Нет пользователей для проверки
                     </li>
                  )}
               </ul>
            </div>
         </div>
         <Activity />
      </div>
   );
};

export default UsersListPage;
