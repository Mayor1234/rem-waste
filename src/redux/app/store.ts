import { configureStore } from '@reduxjs/toolkit';
import skipApi from '../features/skip/skipApi';
import skipReducer from '../features/skip/skipSlice';

export const store = configureStore({
  reducer: {
    skip: skipReducer,
    [skipApi.reducerPath]: skipApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      skipApi.middleware
    ),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
