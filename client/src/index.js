import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MoralisProvider } from "react-moralis";
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './tailwind.output.css';

const container = document.getElementById('root');
const root = createRoot(container);
const appId="i2bV9L8XizhzjzXqVZCb73KXwbIVdWDa2ZxW88DT";
const serverUrl="https://acyksz1klalo.usemoralis.com:2053/server";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MoralisProvider serverUrl={serverUrl} appId={appId}>
       <App />
      </MoralisProvider> 
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
