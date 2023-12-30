import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './features/headerSlice';
import modalReducer from './features/modalSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    modal: modalReducer,
    auth: authReducer,
  },
});
