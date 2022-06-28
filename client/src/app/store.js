import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/userSlice';
import { lastMoveReducer } from '../features/moveSlice';
import { ChessboardReducer } from '../features/chessSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    lastMove: lastMoveReducer,
    chessboard: ChessboardReducer
  },
});
