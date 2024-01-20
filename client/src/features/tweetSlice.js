import { createSlice } from '@reduxjs/toolkit';

const tweetSlice = createSlice({
  name: 'tweet',
  initialState: {
    content: '',
    replyRestrictions: 'Everyone',
  },
  reducers: {
    setInputValue: (state, action) => {
      const { fieldname, value } = action.payload;
      state[fieldname] = value;
    },
    clearInputValue: (state, action) => {
      const { fieldname } = action.payload;
      state[fieldname] = '';
    },
  },
});

export const { setInputValue, clearInputValue } = tweetSlice.actions;
export default tweetSlice.reducer;
