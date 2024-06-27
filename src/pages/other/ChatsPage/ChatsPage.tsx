import cl from './ChatsPage.module.scss';
import { useShowHeader } from '@/hooks/useLayout';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useCallback, useEffect, useState } from 'react';
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
import { IoIosChatbubbles } from 'react-icons/io';
interface Props {}

const ChatsPage: React.FC<Props> = () => {
   useShowHeader();
   const { me } = useAppSelector((state) => state.UserReducer);
   const dispatch = useAppDispatch();
   const { users, chats, currentPerson, currentChat } = useAppSelector(
      (state) => state.ChatReducer,
   );
   const [isMenuOpen, setIsMenuOpen] = useState(true);
   const navigate = useNavigate();


   // function debounce<T extends (...args: any[]) => any>(
   //    func: T,
   //    delay: number,
   // ): (...args: Parameters<T>) => void {
   //    let timeoutId: ReturnType<typeof setTimeout> | null = null;

   //    return (...args) => {
   //       if (timeoutId) {
   //          clearTimeout(timeoutId);
   //       }
   //       timeoutId = setTimeout(() => {
   //          func(...args);
   //       }, delay);
   //    };
   // }

   // const fetchChats = useCallback((username: string) => {
   //    console.log(username);
   //    try {
   //       if (username.length) {
   //          const response = PersonService.getPersonByUsername(username)
   //             .then((res) => {
   //                setUsers([res.data]);
   //             })
   //             .catch(() => {
   //                setUsers([]);
   //             });
   //          // toast.promise(response, {
   //          //    error: {
   //          //       render({ data }) {
   //          //          return `${data}`.includes('404')
   //          //             ? 'Пользователь с таким username не найден'
   //          //             : 'Опять ебаная ошибка(';
   //          //          // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
   //          //       },
   //          //    },
   //          // })
   //       } else {
   //          PersonService.getAllModerators().then((res) => {
   //             setUsers(res.data);
   //          });
   //       }
   //    } catch (e) {}
   // }, []);

   // const debounceFetchUsers = useCallback(
   //    debounce((username: string) => fetchChats(username), 500),
   //    [fetchChats],
   // );

   // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    // setSearch()
   //    debounceFetchUsers(e.target.value);
   // };


   const handleSetChats = () => {
      ChatService.getAllChats()
         .then((res) => {
            dispatch(setChats(res.data));
            console.log();
            // PersonService.getAllPersons(
            //    res.data.map((chat) => chat.secondPersonId),
            // ).then((usersRes) => {
            //    dispatch(setUsers(usersRes.data));
            // });
         })
         .catch((e) => {
            console.log(e);
         });
   };

   useEffect(() => {
      handleSetChats();
      console.log(users, chats);

      return () => {
         dispatch(setUsers([]));
         dispatch(setChats([]));
      };
   }, []);

   useEffect(() => {
      if (chats.length) {
         setUsers([]);
         // chats.forEach((chat) =>
         PersonService.getAllPersons(
            chats.map((chat) => chat.secondPersonId === me?.id ? chat.firstPersonId : chat.secondPersonId)
         ).then((res) => {
            dispatch(setUsers(res?.data));
         });
         // );
         console.log(chats.map((chat) => chat.secondPersonId === me?.id ? chat.firstPersonId : chat.secondPersonId));
         console.log(chats)
      }
   }, [chats]);

   const handleChangeChat = (user: IUser, chat: IChatResponse) => {
      dispatch(setCurrentPerson(null));
      dispatch(setCurrentChat(null));

      dispatch(setCurrentPerson(user));
      dispatch(setCurrentChat(chat));

      setIsMenuOpen(false);
   };

   useEffect(() => {
      if (!currentChat || !currentPerson) {
         setIsMenuOpen(true)
      }
   }, [currentChat, currentPerson])


   const handleSearchChats = () => {

   }

   return (
      <div className={cl.page}>
         <div className={[cl.chatsList, isMenuOpen ? cl.active : ''].join(' ')}>
            <div className={cl.chatsList__search}>
               <input
                  placeholder="Search by chats"
                  className={cl.chatsList__search_input}
                  title="Search chat"
                  onChange={handleSearchChats}
               />
            </div>
            <ul className={cl.chatsList__main}>
               {users.length &&
                  users.map((user, index) => (
                     <li
                        className={cl.chatsList__item}
                        onClick={() =>
                           handleChangeChat(users[index], chats[index])
                        }
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
         <div className={cl.currentChat}>
            <CurrentChat />
         </div>
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
