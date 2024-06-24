import cl from './ChatsPage.module.scss';
import { useShowHeader } from '@/hooks/useLayout';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import { ChatService, IChatResponse } from '@/api/services/ChatService';
import { useNavigate } from 'react-router-dom';
import PersonService from '@/api/services/PersonService';
import maleAvatar from './assets/maleAvatar.jpg';
import femaleAvatar from './assets/femaleAvatar.jpg';
import {
   setChats,
   setCurrentChat,
   setCurrentPerson,
   setUsers,
} from '@/store/reducers/ChatSlice';
import { CurrentChat } from '@/components/layout/CurrentChat/CurrentChat';
import { IUser } from '@/api/models/Person';

interface Props {}

const ChatsPage: React.FC<Props> = () => {
   useShowHeader();
   const { me } = useAppSelector((state) => state.UserReducer);
   const dispatch = useAppDispatch();
   const { users, chats, currentPerson } = useAppSelector(
      (state) => state.ChatReducer,
   );
   const navigate = useNavigate();

   const handleSetChatsUsers = () => {
      ChatService.getAllChats()
         .then((res) => {
            dispatch(setChats(res.data));
            console.log();
            // PersonService.getAllPersons(
            //    res.data.map((chat) => chat.secondPersonId),
            // ).then((usersRes) => {
            //    dispatch(setUsers(usersRes.data));
            // });
            res.data.forEach((chat) =>
               PersonService.getPerson(
                  chat.secondPersonId === me?.id
                     ? chat.firstPersonId
                     : chat.secondPersonId,
               ).then((userRes) => {
                  dispatch(setUsers([...users, userRes.data]));
               }),
            );
         })
         .catch((e) => {
            console.log(e);
         });
   };

   useEffect(() => {
      handleSetChatsUsers();
      console.log(users, chats);

      return () => {
         dispatch(setUsers([]));
         dispatch(setChats([]));
      };
   }, []);

   const handleChangeChat = (user: IUser, chat: IChatResponse) => {
      dispatch(setCurrentPerson(user));
      dispatch(setCurrentChat(chat));
   };

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
               {users.length &&
                  users.map((user, index) => (
                     <li
                        className={cl.chatsList__item}
                        onClick={() => handleChangeChat(user, chats[index])}
                        key={user.id}
                     >
                        <img
                           src={
                              user.gender === 'FEMALE'
                                 ? femaleAvatar
                                 : maleAvatar
                           }
                           alt=""
                        />
                        <p className={cl.chatsList__text}>
                           <span>{users[index]?.username}</span>
                           <span className={cl.lastMessage}>
                              {chats[index]?.lastMessage?.text}
                           </span>
                        </p>
                     </li>
                  ))}
            </ul>
         </div>
         <CurrentChat />
      </div>
   );
};

export default ChatsPage;

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
//    const [currentPerson, setCurrentPerson] = useState<IUser | null>(null);
//    const [chats, setChats] = useState<IChatResponse[]>([]);
//    const [users, setUsers] = useState<IUser[]>([]);
//    const navigate = useNavigate();

//    useEffect(() => {
//       ChatService.getAllChats().then((res) => {
//          setChats(res.data);
//          console.log();
//          PersonService.getAllPersons(
//             res.data.map((chat) => chat.secondPersonId),
//          ).then((usersRes) => {
//             setUsers(usersRes.data);
//          });
//       });
//    }, []);

//    useEffect(() => {
//       if (users.length) {
//          setCurrentPerson(users[0]);
//       }
//    }, [users]);
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
//                {chats.map((chat, index) => (
//                   <li
//                      className={cl.chatsList__item}
//                      onClick={() => setCurrentPerson(users[index])}
//                   >
//                      <img src={''} alt="" />
//                      {users[index]?.username}
//                   </li>
//                ))}
//             </ul>
//          </div>
//          <CurrentChat person={currentPerson} />
//       </div>
//    );
// };

// export default ChatsPage;
