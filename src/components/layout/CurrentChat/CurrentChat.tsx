import { useEffect, useRef, useState } from 'react';
import cl from './CurrentChat.module.scss';
import WebSocketService, {
   ChatService,
   IGetMessagesRequest,
   IMessage,
   IMessageResponse,
} from '@/api/services/ChatService';
import { getTokens } from '@/api/public.api';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IoIosArrowUp, IoIosChatbubbles } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import maleAvatar from './assets/maleAvatar.jpg';
import femaleAvatar from './assets/femaleAvatar.jpg';
import { BlockObserver } from '../BlockObserver/BlockObserver';
import { setCurrentChat, setCurrentPerson } from '@/store/reducers/ChatSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IoArrowBack } from 'react-icons/io5';
import { GoDotFill } from 'react-icons/go';
import {
   ContextMenu,
   IContextMenuItem,
} from '@/components/UI/ContextMenu/ContextMenu';

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

interface Props {}

export const CurrentChat: React.FC<Props> = () => {
   const [messages, setMessages] = useState<IMessage[]>([]);
   const [errors, setErrors] = useState<Error[]>([]);
   const [webSocketService] = useState(new WebSocketService());
   const [messageText, setMessageText] = useState('');
   const { me } = useAppSelector((state) => state.UserReducer);
   const navigate = useNavigate();
   const chatRef = useRef<HTMLUListElement | null>(null);
   const dispatch = useAppDispatch();
   // const [personId, setPersonId] = useState<string | null>(null);
   const [isMessagesEnd, setIsMessagesEnd] = useState(false);
   const [lastReadMessageId, setLastMessageId] = useState<string | null>(null);
   const [replyMessageId, setReplyMessageId] = useState<string | null>(null);
   const { currentPerson, currentChat } = useAppSelector(
      (state) => state.ChatReducer,
   );
   const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(
      null,
   );
   const contextMenuRef = useRef<HTMLDivElement>(null);
   const [isContextMenuShow, setContextMenuShow] = useState(false);
   const [contextMenuItems, setContextMenuItems] = useState<IContextMenuItem[]>(
      [
         {
            title: 'Ответить',
            handleClick: handleReplyMessage,
         },
      ],
   );
   // const chatRef = useRef<HTMLDivElement>(null);

   const handleGetMessages = (
      messagesType: 'new' | 'old',
      offsetMessageId?: string,
   ) => {
      if (currentChat && currentPerson && !isMessagesEnd)
         ChatService.getMessages(messagesType, {
            chatId: currentChat.chatId,
            limit: 50,
            offsetMessageId: offsetMessageId,
         }).then((res) => {
            if (!res.data.length) {
               setIsMessagesEnd(true);
               return;
            }
            console.log(res.data);

            setMessages((prev) => [...prev, ...res.data]);
            console.log(messages);
         });
   };

   function handleReplyMessage() {
      if (selectedMessage) {
         setReplyMessageId(selectedMessage.id);
         setContextMenuShow(false);
         console.log(replyMessageId);
      }
   }

   useEffect(() => {
      const { accessToken } = getTokens();
      setMessages([]);
      webSocketService.disconnect();
      if (accessToken && me) {
         webSocketService.connect(accessToken).then(() => {
            webSocketService.subscribe(
               me.id,
               handleMessageReceived,
               handleErrorReceived,
            );
            handleGetMessages('old');
         });
      }

      return () => {
         webSocketService.disconnect();
         setIsMessagesEnd(false);
         setMessages([]);
      };
   }, [webSocketService]);

   useEffect(() => {
      if (!currentChat || !currentPerson) {
         setMessages([]);
      }
      if (currentPerson && currentChat) {
         setIsMessagesEnd(false);
         setMessages([]);
      }
   }, [currentPerson, currentChat]);

   const handleMessageReceived = (message: IMessageResponse) => {
      setMessages((prevMessages) => [message.o, ...prevMessages]);
   };
   // .reverse()
   const handleErrorReceived = (error: Error) => {
      setErrors((prevErrors) => [...prevErrors, error]);
   };

   // useEffect(() => {
   //    if (params.personId) {
   //       setPersonId(params.personId);
   //    }
   // }, [params]);

   const sendMessage = (
      personId: string,
      text: string,
      replyMessageId: string | null,
   ) => {
      webSocketService.sendMessage({
         receiverId: personId,
         text: text,
         replyMessageId: replyMessageId,

         // attachments: [],
      });
   };

   const markMessageAsRead = (chatId: string, messageId: string) => {
      webSocketService.markMessageAsRead(chatId, messageId);
   };

   const handleSendMessage = () => {
      if (messageText && currentPerson) {
         sendMessage(currentPerson.id, messageText, replyMessageId);
         setMessageText('');
         setReplyMessageId(null);
         // console.log(messages);
      }
   };
   const handleReadMessage = (messageId: string) => {
      if (messageId && currentChat) {
         markMessageAsRead(messageId, currentChat.chatId);
      }
   };

   useEffect(() => {
      if (chatRef.current) {
         chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
   }, [currentChat, currentPerson]);

   useEffect(() => {
      console.log(errors);
   }, [errors]);
   useEffect(() => {
      console.log(messages);
   }, [messages]);

   const handleClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // e.preventDefault();
      if (e.key === 'Enter') {
         handleSendMessage();
      }
   };

   const handleContextMenuOpen = (
      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
      message: IMessage,
   ) => {
      e.preventDefault();
      e.stopPropagation();
      if (!contextMenuRef.current) return;
      setSelectedMessage(message);

      contextMenuRef.current.style.top = `${e.clientY + 5}px`;
      contextMenuRef.current.style.left = `${e.clientX + 5}px`;
      // console.log(message);
      setContextMenuShow(true);
      console.log(selectedMessage);
   };

   useEffect(() => {
      // console.log(selectedMessage);
   }, [selectedMessage]);

   const openChats = () => {
      dispatch(setCurrentChat(null));
      dispatch(setCurrentPerson(null));
      console.log(1);
   };
   return (
      <div className={cl.currentChat} onClick={() => setContextMenuShow(false)}>
         {currentPerson ? (
            <>
               <div className={cl.currentChat__header}>
                  <button
                     title="Back"
                     className={cl.backBtn}
                     onClick={openChats}
                  >
                     <IoArrowBack />
                  </button>
                  <div
                     className={cl.currentChat__user}
                     onClick={() => navigate(`/profile/${currentPerson.id}`)}
                  >
                     <img
                        src={
                           currentPerson.gender === 'FEMALE'
                              ? femaleAvatar
                              : maleAvatar
                        }
                        alt=""
                     />
                     <span>{currentPerson.username}</span>
                  </div>
                  {/* <div className={cl.currentChat__advert}>
                     <p className={cl.currentChat__model}>BMW X5 2020Y</p>
                     <span className={cl.currentChat__price}>20.000$</span>
                  </div> */}
               </div>
               <div className={cl.currentChat__main}>
                  <ul className={cl.currentChat__main_messages} ref={chatRef}>
                     {messages.map((message) => (
                        <li
                           key={message?.id}
                           className={[
                              cl.message,
                              message?.senderId === me?.id ? cl.my : '',
                           ].join(' ')}
                           onClick={() => handleReadMessage(message.id)}
                           onContextMenu={(e) =>
                              handleContextMenuOpen(e, message)
                           }
                        >
                           <span>{message?.text}</span>
                           <GoDotFill />
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
                     <li>
                        <BlockObserver
                           onBlockVisible={
                              () => {
                                 handleGetMessages(
                                    'old',
                                    messages[messages.length - 1]?.id,
                                 );
                                 console.log(messages[messages.length - 1]);
                              }
                              // console.log(
                              //    messages[0],
                              //    messages[messages.length - 1],
                              // )
                           }
                        />
                     </li>
                  </ul>
                  <div className={cl.currentChat__sendContainer}>
                     <input
                        title="Write a message"
                        // type="text"
                        placeholder="Write a message"
                        className={cl.currentChat__sendInput}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyUp={handleClickEnter}
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
               <div className={cl.contextMenuContainer} ref={contextMenuRef}>
                  <ContextMenu
                     list={contextMenuItems}
                     isShow={isContextMenuShow}
                  />
               </div>
            </>
         ) : (
            <div>Выберите чат</div>
         )}
      </div>
   );
};
