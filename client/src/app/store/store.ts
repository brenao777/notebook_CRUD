import { configureStore } from '@reduxjs/toolkit';
import notebookReducer from '../../entities/notebook/model/notebookSlice';
import userReducer from '../../entities/user/model/userSlice';

export const store = configureStore({
  reducer: {
    notebooks: notebookReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
