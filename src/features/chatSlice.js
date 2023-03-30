import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {},
  reducers: {
    setChats: (state, action) => {
      return action.payload;
    },
    addChat: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    removeChat: (state, action) => {
      delete state[action.payload];
    },
    updateChat: (state, action) => {
      const { id, ...chat } = action.payload;
      state[id] = { ...state[id], ...chat };
    },
  },
});

export const { setChats, addChat, removeChat, updateChat } = chatsSlice.actions;

export default chatsSlice.reducer;
