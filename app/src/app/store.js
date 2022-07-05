import { configureStore, createAction } from '@reduxjs/toolkit';
import { menuReducer } from '../features/Menu/menuSlice';
import { chessReducer } from '../features/Chessboard/chessSlice';

export const store = configureStore({
    reducer: {
      menu: menuReducer,
      chess: chessReducer
    },
  });