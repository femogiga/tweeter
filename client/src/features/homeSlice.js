import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    dataToRender: [],

  },
  reducers: {

    setHomeData: (state, action) => {
      const { allTweetDataWithComment } = action.payload;
     state.dataToRender = allTweetDataWithComment;
      },

  },
});

export const { setHomeData } = homeSlice.actions;
export default homeSlice.reducer;
