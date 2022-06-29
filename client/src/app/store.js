import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/userSlice';
import { lastMoveReducer } from '../features/moveSlice';
import { createStore, applyMiddleware } from 'redux'

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {
  chess:{
    chessboard:[[{ coo:undefined }]],
    lastMove: { 
      firstStep:undefined, 
      piece:undefined, 
      secondMove:undefined 
    },
    graveyard: [{
      white:[{piece:undefined}],
      black:[{piece:undefined}]
    }]
  },
  user:{id:undefined, address:undefined}
}

function rootReducer(state=initialState, action){
  switch(action.type){
    case LOGIN: 
      state.user.id=action.payload.id;state.user.address=action.payload.address;
      return state;
      break;
    case LOGOUT: 
      state.user.id=undefined;state.user.address=undefined;
      return state;
      break;
  }
}

function Middleware({ getState, dispatch }){
  return function(next){
    console.log(next);
    return function(action){
      console.log(action);
      return next(action);
    }
  }
}

export const store = createStore(rootReducer, applyMiddleware(Middleware));