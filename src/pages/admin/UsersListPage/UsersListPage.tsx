import { IUser } from '@/models/User.types';
import cl from './UsersListPage.module.scss';
import { useHideFooter } from '@/hooks/useLayout';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Activity } from '@/components/layout/Activity/Activity';

interface Props {}

const UsersListPage: React.FC<Props> = () => {
   useHideFooter();
   const [search, setSearch] = useState('');
   const [users, setUsers] = useState<{ username: string; role: string }[]>([
      {
         username: 'Владиaaслав Хван',
         role: 'ADMINISTRATOR',
      },
      {
         username: 'Владислав Хвaaан',
         role: 'MODERATOR',
      },
      {
         username: 'Владислaaaав Хван',
         role: 'HELPER',
      },
      {
         username: 'Владaaислав Хван',
         role: 'ADMINISTRATOR',
      },
      {
         username: 'Владиaслав Хван',
         role: 'MODERATOR',
      },
      {
         username: 'Влaaaадислав Хван',
         role: 'HELPER',
      },
   ]);
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
               <div className={cl.usersList__body}>
                  {filtredUsers.map((user) => (
                     <div className={cl.usersList__line} key={user.username}>
                        <div className={cl.usersList__column}>{user.role}</div>
                        <div className={cl.usersList__column}>
                           {user.username}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <Activity />
      </div>
   );
};

export default UsersListPage;
