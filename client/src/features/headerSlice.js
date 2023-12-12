import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    loginModalVisibility: false,
  },
  reducers: {
    setLoginModalState: (state, action) => {
      state.loginModalVisibility = action.payload;
    },
  },
});

export const { setLoginModalState } = headerSlice.actions;
export default headerSlice.reducer;
