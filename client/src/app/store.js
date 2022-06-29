import { configureStore, getDefaultMiddleware, createAction } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { 
    user: userReducer,
    chessboard: chessboardReducer
  },
  middleware: [...getDefaultMiddleware(),] 
});