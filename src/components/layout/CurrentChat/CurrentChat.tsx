import { useEffect, useState } from 'react';
import cl from './CurrentChat.module.scss';
import WebSocketService from '@/api/services/ChatService';
import { getTokens } from '@/api/public.api';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useParams } from 'react-router-dom';

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
   // personId: string | null;
}

export const CurrentChat: React.FC<Props> = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [errors, setErrors] = useState<Error[]>([]);
   const [webSocketService] = useState(new WebSocketService());
   const [messageText, setMessageText] = useState('');
   const { me } = useAppSelector((state) => state.UserReducer);
   const [personId, setPersonId] = useState<string | null>(null);
   const params = useParams();
   useEffect(() => {
      const { accessToken } = getTokens();
      if (accessToken && personId) {
         webSocketService.connect(accessToken).then(() => {
            webSocketService.subscribe(
               personId,
               handleMessageReceived,
               handleErrorReceived,
            );
         });
      }
   }, [webSocketService]);

   useEffect(() => {
      if (params.id) {
         setPersonId(params.id);
      }
   }, [params]);

   const handleMessageReceived = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
   };

   const handleErrorReceived = (error: Error) => {
      setErrors((prevErrors) => [...prevErrors, error]);
   };

   const sendMessage = (text: string) => {
      if (me) {
         webSocketService.sendMessage({
            receiverId: me.id,
            text: text,
            replyMessageId: null,
            attachments: [],
         });
      }
   };

   const markMessageAsRead = (chatId: string, messageId: string) => {
      webSocketService.markMessageAsRead(chatId, messageId);
   };

   const handleSendMessage = () => {
      if (messageText) {
         sendMessage(messageText);
      }
   };

   useEffect(() => {
      console.log(errors);
   }, [errors]);
   return (
      <div className={cl.currentChat}>
         {personId ? (
            <>
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
                  <ul className={cl.currentChat__main_messages}>
                     {messages.map((message) => (
                        <li key={message.o.id}>
                           <p>{message.o.text}</p>
                           <button
                              onClick={() =>
                                 markMessageAsRead(
                                    message.o.chatId,
                                    message.o.id,
                                 )
                              }
                           >
                              Mark as Read
                           </button>
                        </li>
                     ))}
                  </ul>
                  <input
                     title="Write a message"
                     type="text"
                     placeholder="Write a message"
                     className={cl.currentChat__main_input}
                     value={messageText}
                     onChange={(e) => setMessageText(e.target.value)}
                  />
                  <button
                     title="Send message"
                     type="button"
                     onClick={handleSendMessage}
                  ></button>
               </div>
            </>
         ) : (
            <div>Выберите чат</div>
         )}
      </div>
   );
};
