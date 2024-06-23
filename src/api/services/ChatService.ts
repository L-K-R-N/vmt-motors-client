import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import $api from '../public.api';
import { AxiosResponse } from 'axios';

interface IMessageResponse {
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

interface IMessageReadResponse {
   t: 'READ';
   o: {
      chatId: string;
      messageId: string;
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

interface IErrorResponse {
   message: string;
   timestamp: number;
}

export interface IChatResponse {
   chatId: string;
   firstPersonId: string;
   secondPersonId: string;
   firstPersonIdLastReadMessageId: string;
   secondPersonIdLastReadMessageId: string;
   lastMessage: IMessageResponse;
}

export class ChatService {
   static async getAllChats() // params: IParams,
   : Promise<AxiosResponse<IChatResponse[]>> {
      return $api.get<IChatResponse[]>('chat/all');
   }
}

class WebSocketService {
   private stompClient: Client | null = null;

   public connect(accessToken: string): Promise<void> {
      return new Promise((resolve, reject) => {
         const socket = new SockJS('https://vmt-motors.com/ws');
         this.stompClient = Stomp.over(socket);

         const headers = {
            Authorization: `Bearer ${accessToken}`,
         };

         this.stompClient.connect(
            headers,
            () => {
               console.log('WebSocket connected');
               resolve();
            },
            (error) => {
               console.error('WebSocket connection error:', error);
               reject(error);
            },
         );
      });
   }

   public subscribe(
      id: string,
      onMessageReceived: (message: IMessageResponse) => void,
      onErrorReceived: (error: IErrorResponse) => void,
   ): void {
      if (this.stompClient) {
         this.stompClient.subscribe(`/user/${id}/queue/message`, (payload) => {
            onMessageReceived(JSON.parse(payload.body));
         });

         this.stompClient.subscribe(`/user/${id}/queue/error`, (payload) => {
            onErrorReceived(JSON.parse(payload.body));
         });
      }
   }

   public sendMessage(message: {
      receiverId: string;
      // text: string;
      // replyMessageId: string | null;
      // attachments: string[];

      // chatId: number;
      // chatType: 'SINGLE';
      text: string;
   }): void {
      if (this.stompClient) {
         this.stompClient.send(
            '/messenger/chat/message',
            {},
            JSON.stringify(message),
         );
      }
   }

   public markMessageAsRead(chatId: string, messageId: string): void {
      if (this.stompClient) {
         this.stompClient.send(
            '/messenger/chat/read',
            {},
            JSON.stringify({ chatId, messageId }),
         );
      }
   }
}

export default WebSocketService;
