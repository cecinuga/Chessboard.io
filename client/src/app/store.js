import { configureStore, getDefaultMiddleware, createAction } from '@reduxjs/toolkit';
import { userReducer } from './features/userSlice';
import { gameReducer } from './features/gameSlice';

import { userLogin, userLogout } from './features/userSlice';
import { move } from './features/gameSlice';

function loggerMiddleware(store){
  return function(next){
    return function(action){
      console.log(action);
      return next(action);
    }
  }
}
/*function apiMiddleware({dispatch}){
  return function(next){
    return function(action){
      switch(action.type){
        case userLogin.toString():
          //loggati
      }
      return next(action);
    }
  }
}*/
const middleware = [/*apiMiddleware,*/ loggerMiddleware];

export const store = configureStore({
  reducer: { 
    user: userReducer,
    game: gameReducer,
  },
  middleware: [...getDefaultMiddleware(), ...middleware],
});
