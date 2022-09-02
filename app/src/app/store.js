import { configureStore, createAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk'

import { menuReducer } from '../features/Menu/menuSlice';
import { chessReducer } from '../features/Chessboard/chessSlice';

export const rootReducer = combineReducers({
  menu:menuReducer,
  chess:chessReducer,
});

const persistConfig = {
  key:'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});
export const persistor = persistStore(store)

export const factory = ()=>{
  return {store:store, persistor:persistor}
}