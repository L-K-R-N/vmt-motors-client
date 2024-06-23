// import cl from './ChatsPage.module.scss';
// import { useShowHeader } from '@/hooks/useLayout';
// import { useAppDispatch } from '@/hooks/useAppDispatch';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { useEffect, useState } from 'react';
// import { CurrentChat } from '@/components/layout/CurrentChat/CurrentChat';
// import { ChatService, IChatResponse } from '@/api/services/ChatService';
// import { useNavigate } from 'react-router-dom';
// import { IUser } from '@/api/models/Person';
// import PersonService from '@/api/services/PersonService';

// interface Props {}

// const ChatsPage: React.FC<Props> = () => {
//    useShowHeader();
//    const dispatch = useAppDispatch();
//    const { products } = useAppSelector((state) => state.ProductsReducer);
//    const [currentPersonId, setCurrentPersonId] = useState<string | null>(null);
//    const [chats, setChats] = useState<IChatResponse[]>([]);
//    const [users, setUsers] = useState<IUser[]>([]);
//    const navigate = useNavigate();

//    useEffect(() => {
//       ChatService.getAllChats().then((res) => {
//          setChats(res.data);
//          console.log();
//          // PersonService.getAllPersons(
//          //    res.data.map((chat) => chat.secondPersonId),
//          // ).then((usersRes) => {
//          //    setUsers(usersRes.data);
//          // });
//       });
//    }, []);

//    useEffect(() => {
//       if (chats.length) {
//          navigate(`/chats/${chats[0].secondPersonId}`);
//       }
//    }, []);
//    return (
//       <div className={cl.page}>
//          <div className={cl.chatsList}>
//             <div className={cl.chatsList__search}>
//                <input
//                   placeholder="Search by chats"
//                   className={cl.chatsList__search_input}
//                   title="Search chat"
//                />
//             </div>
//             <ul className={cl.chatsList__main}>
//                {chats.map((chat) => (
//                   <li
//                      className={cl.chatsList__item}
//                      onClick={() => navigate(`/chats/${chat.secondPersonId}`)}
//                   >
//                      <img src={''} alt="" />
//                      {chat.chatId}
//                   </li>
//                ))}
//             </ul>
//          </div>
//          <CurrentChat />
//       </div>
//    );
// };

// export default ChatsPage;

import cl from './ChatsPage.module.scss';
import { useShowHeader } from '@/hooks/useLayout';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { CurrentChat } from '@/components/layout/CurrentChat/CurrentChat';
import { ChatService, IChatResponse } from '@/api/services/ChatService';
import { useNavigate } from 'react-router-dom';
import { IUser } from '@/api/models/Person';
import PersonService from '@/api/services/PersonService';

interface Props {}

const ChatsPage: React.FC<Props> = () => {
   useShowHeader();
   const dispatch = useAppDispatch();
   const { products } = useAppSelector((state) => state.ProductsReducer);
   const [currentPerson, setCurrentPerson] = useState<IUser | null>(null);
   const [chats, setChats] = useState<IChatResponse[]>([]);
   const [users, setUsers] = useState<IUser[]>([]);
   const navigate = useNavigate();

   useEffect(() => {
      ChatService.getAllChats().then((res) => {
         setChats(res.data);
         console.log();
         // PersonService.getAllPersons(
         //    res.data.map((chat) => chat.secondPersonId),
         // ).then((usersRes) => {
         //    setUsers(usersRes.data);
         // });
      });
   }, []);

   // useEffect(() => {
   //    if (chats.length) {
   //       navigate(`/chats/${chats[0].secondPersonId}`);
   //    }
   // }, []);

   useEffect(() => {
      if (users.length) {
         setCurrentPerson(users[0]);
      }
   }, [users]);
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
               {chats.map((chat, index) => (
                  <li
                     className={cl.chatsList__item}
                     onClick={() => setCurrentPerson(users[index])}
                  >
                     <img src={''} alt="" />
                     {users[index]?.username}
                  </li>
               ))}
            </ul>
         </div>
         <CurrentChat person={currentPerson} />
      </div>
   );
};

export default ChatsPage;
