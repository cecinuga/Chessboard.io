import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MoralisProvider } from "react-moralis";
import { store } from './app/store';
import  Pstore  from './app/persistent_store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './tailwind.output.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container);
const persistore = persistStore(Pstore)

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <MoralisProvider serverUrl={process.env.REACT_APP_SERVER_URL} appId={process.env.REACT_APP_ID}>
        <App />
        </MoralisProvider> 
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
