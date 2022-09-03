import { configureStore, createAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk'

import { menuReducer } from '../features/Menu/menuSlice';
import { chessReducer } from '../features/Chessboard/chessSlice';
import createMigrate from 'redux-persist/es/createMigrate';

export const rootReducer = combineReducers({
  menu:menuReducer,
  chess:chessReducer,
});
const migrations = {
  1: (state) => {
    // migration clear out device state
    return {
      ...state,
      device: undefined   
    }
  },
  2: (state) => {
    // migration to keep only device state
    return {
      device: state.device
    }
  }
}
const persistConfig = {
  key:'root',
  storage,
  version:2,
  blacklist:['chess'],
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug:true })
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