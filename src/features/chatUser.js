import { createSlice } from '@reduxjs/toolkit';

const chatUsersSlice = createSlice({
  name: 'chatUsers',
  initialState: [],
  reducers: {
    setChatUsers: (state, action) => {
      return action.payload;
    },
    addChatUser: (state, action) => {
      state.push(action.payload);
    },
    removeChatUser: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { setChatUsers, addChatUser, removeChatUser } =
  chatUsersSlice.actions;

export default chatUsersSlice.reducer;
