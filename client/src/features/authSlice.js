import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    firstName: '',
    lastName:'',
    searchText: '',
  },
  reducers: {
    setInput: (state, action) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
    },
    clearInput: (state, action) => {
      const { fieldName } = action.payload;
      state[fieldName] = '';
    },
  },
});

export const { setInput, clearInput } = authSlice.actions;
export default authSlice.reducer;
