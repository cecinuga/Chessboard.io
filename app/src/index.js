import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MoralisProvider } from "react-moralis";
import { factory } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './tailwind.output.css';

import { menuReducer } from './features/Menu/menuSlice';
import { chessReducer} from './features/Chessboard/chessSlice';

const container = document.getElementById('root');
const root = createRoot(container);
const { store, persistor } = factory();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <MoralisProvider serverUrl={process.env.REACT_APP_SERVER_URL} appId={process.env.REACT_APP_ID}>
          < App />
        </MoralisProvider> 
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
