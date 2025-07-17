import { configureStore, createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    setMessages: (state, action) => {
      return action.payload;
    },
    clearMessages: () => [],
  },
});

export const { addMessage, setMessages, clearMessages } = messagesSlice.actions;

const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
  },
});

export default store;
