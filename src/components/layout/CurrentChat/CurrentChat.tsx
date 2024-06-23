// import { useEffect, useState } from 'react';
// import cl from './CurrentChat.module.scss';
// import WebSocketService from '@/api/services/ChatService';
// import { getTokens } from '@/api/public.api';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { useParams } from 'react-router-dom';
// import { BiMailSend } from 'react-icons/bi';
// import { IoIosArrowUp } from 'react-icons/io';
// interface Message {
//    t: 'MESSAGE';
//    o: {
//       id: string;
//       text: string;
//       senderId: string;
//       chatId: string;
//       replyMessageId: string | null;
//       attachments: Attachment[];
//    };
// }

// interface Attachment {
//    id: string;
//    contentType:
//       | 'APPLICATION'
//       | 'AUDIO'
//       | 'IMAGE'
//       | 'MULTIPART'
//       | 'TEXT'
//       | 'VIDEO'
//       | 'OTHER';
//    name: string;
// }

// interface Error {
//    message: string;
//    timestamp: number;
// }

// interface Props {
//    // personId: string | null;
// }

// export const CurrentChat: React.FC<Props> = () => {
//    const [messages, setMessages] = useState<Message[]>([]);
//    const [errors, setErrors] = useState<Error[]>([]);
//    const [webSocketService] = useState(new WebSocketService());
//    const [messageText, setMessageText] = useState('');
//    const { me } = useAppSelector((state) => state.UserReducer);
//    const [personId, setPersonId] = useState<string | null>(null);
//    const params = useParams();
//    useEffect(() => {
//       const { accessToken } = getTokens();
//       if (accessToken && me) {
//          webSocketService.connect(accessToken).then(() => {
//             webSocketService.subscribe(
//                me.id,
//                handleMessageReceived,
//                handleErrorReceived,
//             );
//          });
//       }
//    }, [webSocketService]);

//    const handleMessageReceived = (message: Message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//    };

//    const handleErrorReceived = (error: Error) => {
//       setErrors((prevErrors) => [...prevErrors, error]);
//    };

//    useEffect(() => {
//       if (params.personId) {
//          setPersonId(params.personId);
//       }
//    }, [params]);

//    const sendMessage = (text: string) => {
//       if (personId) {
//          webSocketService.sendMessage({
//             receiverId: personId,
//             text: text,
//             // replyMessageId: null,

//             // attachments: [],

//             // chatId: 1,
//             // chatType: 'SINGLE',
//          });
//       }
//    };

//    const markMessageAsRead = (chatId: string, messageId: string) => {
//       webSocketService.markMessageAsRead(chatId, messageId);
//    };

//    const handleSendMessage = () => {
//       if (messageText) {
//          sendMessage(messageText);
//          setMessageText('');
//          // console.log(messages);
//       }
//    };

//    useEffect(() => {
//       console.log(errors);
//    }, [errors]);
//    useEffect(() => {
//       console.log(messages);
//    }, [messages]);
//    return (
//       <div className={cl.currentChat}>
//          {personId ? (
//             <>
//                <div className={cl.currentChat__header}>
//                   <div className={cl.currentChat__user}>
//                      <img src="" alt="" />
//                      <span>Владислав Хван</span>
//                   </div>
//                   <div className={cl.currentChat__advert}>
//                      <p className={cl.currentChat__model}>BMW X5 2020Y</p>
//                      <span className={cl.currentChat__price}>20.000$</span>
//                   </div>
//                </div>
//                <div className={cl.currentChat__main}>
//                   <ul className={cl.currentChat__main_messages}>
//                      {messages.map((message) => (
//                         <li
//                            key={message.o.id}
//                            className={[
//                               cl.message,
//                               message.o.senderId === me?.id ? cl.my : '',
//                            ].join(' ')}
//                         >
//                            {message.o.text}
//                            {/* <button
//                               onClick={() =>
//                                  markMessageAsRead(
//                                     message.o.chatId,
//                                     message.o.id,
//                                  )
//                               }
//                            >
//                               Mark as Read
//                            </button> */}
//                         </li>
//                      ))}
//                   </ul>
//                   <div className={cl.currentChat__sendContainer}>
//                      <input
//                         title="Write a message"
//                         type="text"
//                         placeholder="Write a message"
//                         className={cl.currentChat__sendInput}
//                         value={messageText}
//                         onChange={(e) => setMessageText(e.target.value)}
//                      />
//                      <button
//                         title="Send message"
//                         className={cl.currentChat__sendBtn}
//                         type="button"
//                         onClick={handleSendMessage}
//                      >
//                         <IoIosArrowUp />
//                      </button>
//                   </div>
//                </div>
//             </>
//          ) : (
//             <div>Выберите чат</div>
//          )}
//       </div>
//    );
// };

import { useEffect, useState } from 'react';
import cl from './CurrentChat.module.scss';
import WebSocketService from '@/api/services/ChatService';
import { getTokens } from '@/api/public.api';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useParams } from 'react-router-dom';
import { IUser } from '@/api/models/Person';
import { IoIosArrowUp } from 'react-icons/io';

interface Message {
   t: 'MESSAGE';
   o: {
      id: string;
      text: string;
      senderId: string;
      chatId: string;
      replyMessageId: string | null;
      attachments: Attachment[];
   };
}

interface Attachment {
   id: string;
   contentType:
      | 'APPLICATION'
      | 'AUDIO'
      | 'IMAGE'
      | 'MULTIPART'
      | 'TEXT'
      | 'VIDEO'
      | 'OTHER';
   name: string;
}

interface Error {
   message: string;
   timestamp: number;
}

interface Props {
   person: IUser | null;
}

export const CurrentChat: React.FC<Props> = ({ person }) => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [errors, setErrors] = useState<Error[]>([]);
   const [webSocketService] = useState(new WebSocketService());
   const [messageText, setMessageText] = useState('');
   const { me } = useAppSelector((state) => state.UserReducer);
   // const [personId, setPersonId] = useState<string | null>(null);
   useEffect(() => {
      const { accessToken } = getTokens();
      if (accessToken && me) {
         webSocketService.connect(accessToken).then(() => {
            webSocketService.subscribe(
               me.id,
               handleMessageReceived,
               handleErrorReceived,
            );
         });
      }
   }, [webSocketService]);

   const handleMessageReceived = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
   };

   const handleErrorReceived = (error: Error) => {
      setErrors((prevErrors) => [...prevErrors, error]);
   };

   // useEffect(() => {
   //    if (params.personId) {
   //       setPersonId(params.personId);
   //    }
   // }, [params]);

   const sendMessage = (text: string) => {
      if (person) {
         webSocketService.sendMessage({
            receiverId: person.id,
            text: text,
            // replyMessageId: null,

            // attachments: [],

            // chatId: 1,
            // chatType: 'SINGLE',
         });
      }
   };

   const markMessageAsRead = (chatId: string, messageId: string) => {
      webSocketService.markMessageAsRead(chatId, messageId);
   };

   const handleSendMessage = () => {
      if (messageText) {
         sendMessage(messageText);
         setMessageText('');
         // console.log(messages);
      }
   };

   useEffect(() => {
      console.log(errors);
   }, [errors]);
   useEffect(() => {
      console.log(messages);
   }, [messages]);
   return (
      <div className={cl.currentChat}>
         {person ? (
            <>
               <div className={cl.currentChat__header}>
                  <div className={cl.currentChat__user}>
                     <img src="" alt="" />
                     <span>{person.username}</span>
                  </div>
                  {/* <div className={cl.currentChat__advert}>
                     <p className={cl.currentChat__model}>BMW X5 2020Y</p>
                     <span className={cl.currentChat__price}>20.000$</span>
                  </div> */}
               </div>
               <div className={cl.currentChat__main}>
                  <ul className={cl.currentChat__main_messages}>
                     {messages.map((message) => (
                        <li
                           key={message.o.id}
                           className={[
                              cl.message,
                              message.o.senderId === me?.id ? cl.my : '',
                           ].join(' ')}
                        >
                           {message.o.text}
                           {/* <button
                              onClick={() =>
                                 markMessageAsRead(
                                    message.o.chatId,
                                    message.o.id,
                                 )
                              }
                           >
                              Mark as Read
                           </button> */}
                        </li>
                     ))}
                  </ul>
                  <div className={cl.currentChat__sendContainer}>
                     <input
                        title="Write a message"
                        type="text"
                        placeholder="Write a message"
                        className={cl.currentChat__sendInput}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                     />
                     <button
                        title="Send message"
                        className={cl.currentChat__sendBtn}
                        type="button"
                        onClick={handleSendMessage}
                     >
                        <IoIosArrowUp />
                     </button>
                  </div>
               </div>
            </>
         ) : (
            <div>Выберите чат</div>
         )}
      </div>
   );
};
