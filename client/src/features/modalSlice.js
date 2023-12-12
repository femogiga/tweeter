import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    whoCanReplyModalVisible: false,
    loginModalVisible: false,
  },
  reducers: {
    setWhocanModalVisibility: (state, action) => {
      switch (action.payload) {
        case 'show':
          state.whoCanReplyModalVisible = true;
          break;
        default:
          state.whoCanReplyModalVisible = false;
          break;
      }
    },
  },
});

export const { setWhocanModalVisibility } = modalSlice.actions;
export default modalSlice.reducer;
