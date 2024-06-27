import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/api/models/Person';
import { IChatResponse } from '@/api/services/ChatService';

export interface IChatState {
   chats: IChatResponse[];
   currentPerson: IUser | null;
   users: IUser[];
   currentChat: IChatResponse | null;
}

const initialState: IChatState = {
   chats: [],
   currentPerson: null,
   users: [],
   currentChat: null,
};

export const ChatSlice = createSlice({
   name: 'UserSlice',
   initialState,
   reducers: {
      setChats: (state, action: PayloadAction<IChatResponse[]>) => {
         state.chats = action.payload;
      },
      setCurrentPerson: (state, action: PayloadAction<IUser | null>) => {
         state.currentPerson = action.payload;
      },
      setCurrentChat: (state, action: PayloadAction<IChatResponse | null>) => {
         state.currentChat = action.payload;
      },
      setUsers: (state, action: PayloadAction<IUser[]>) => {
         state.users = action.payload;
      },
   },
});

export default ChatSlice.reducer;

export const { setChats, setCurrentPerson, setUsers, setCurrentChat } =
   ChatSlice.actions;
