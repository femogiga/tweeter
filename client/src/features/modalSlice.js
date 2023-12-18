import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    whoCanReplyModalVisible: false,
    followingModalVisible: false,
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
    setFollowingModalVisibility: (state, action) => {
      switch (action.payload) {
        case 'show':
          state.followingModalVisible = true;
          break;
        default:
          state.followingModalVisible = false;
          break;
      }
    },
  },
});

export const { setWhocanModalVisibility, setFollowingModalVisibility } =
  modalSlice.actions;
export default modalSlice.reducer;
