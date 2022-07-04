import { configureStore, createAction } from '@reduxjs/toolkit';
import { menuReducer } from '../features/Menu/menuSlice';

export const store = configureStore({
    reducer: {
      menu: menuReducer,
    },
  });