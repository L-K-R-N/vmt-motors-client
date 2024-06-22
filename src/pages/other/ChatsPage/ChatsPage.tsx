import cl from './ChatsPage.module.scss';
import { useShowHeader } from '@/hooks/useLayout';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { CurrentChat } from '@/components/layout/CurrentChat/CurrentChat';
import { IUser } from '@/api/models/Person';
import PersonService from '@/api/services/PersonService';

interface Props {}

const ChatsPage: React.FC<Props> = () => {
   useShowHeader();
   const dispatch = useAppDispatch();
   const { products } = useAppSelector((state) => state.ProductsReducer);
   const [currentPersonId, setCurrentPersonId] = useState<string | null>(null);
   const [users, setUsers] = useState<IUser[]>([]);

   useEffect(() => {
      PersonService.getAllPersons().then((res) => {
         setUsers(res.data);
      });
   }, []);
   return (
      <div className={cl.page}>
         <div className={cl.chatsList}>
            <div className={cl.chatsList__search}>
               <input
                  placeholder="Search by chats"
                  className={cl.chatsList__search_input}
                  title="Search chat"
               />
            </div>
            <ul className={cl.chatsList__main}>
               {users.map((user) => (
                  <li
                     className={cl.chatsList__item}
                     onClick={() => setCurrentPersonId(user.id)}
                  >
                     <img src={''} alt="" />
                     {user.name}
                  </li>
               ))}
            </ul>
         </div>
         <CurrentChat />
      </div>
   );
};

export default ChatsPage;
