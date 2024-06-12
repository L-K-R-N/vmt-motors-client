import cl from './ChatsPage.module.scss';
import { useShowHeader } from '@/hooks/useLayout';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useState } from 'react';

interface Props {}

const ChatsPage: React.FC<Props> = () => {
   useShowHeader();
   const dispatch = useAppDispatch();
   const { products } = useAppSelector((state) => state.ProductsReducer);
   const [chats, setChats] = useState<{ id: number; personId: string }[]>([
      {
         id: 1,
         personId: 'asdfasdf',
      },
      {
         id: 2,
         personId: 'asdfasdf',
      },
      {
         id: 3,
         personId: 'asdfasdf',
      },
      {
         id: 4,
         personId: 'asdfasdf',
      },
      {
         id: 5,
         personId: 'asdfasdf',
      },
   ]);

   const [users, setUsers] = useState<{ name: string }[]>([
      {
         name: 'Владислав Хван',
      },
      {
         name: 'Хван Владислав',
      },
      {
         name: 'Владислав Хван',
      },
      {
         name: 'Хван Владислав',
      },
      {
         name: 'Владислав Хван',
      },
      {
         name: 'Хван Владислав',
      },
      {
         name: 'Владислав Хван',
      },
   ]);
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
                  <li className={cl.chatsList__item}>
                     <img src={''} alt="" />
                     {user.name}
                  </li>
               ))}
            </ul>
         </div>
         <div className={cl.currentChat}>
            <div className={cl.currentChat__header}>
               <div className={cl.currentChat__user}>
                  <img src="" alt="" />
                  <span>Владислав Хван</span>
               </div>
               <div className={cl.currentChat__advert}>
                  <p className={cl.currentChat__model}>BMW X5 2020Y</p>
                  <span className={cl.currentChat__price}>20.000$</span>
               </div>
            </div>
            <div className={cl.currentChat__main}>
               <div className={cl.currentChat__main_messages}></div>
               <input
                  title="Write a message"
                  type="text"
                  placeholder="Write a message"
                  className={cl.currentChat__main_input}
               />
            </div>
         </div>
      </div>
   );
};

export default ChatsPage;
