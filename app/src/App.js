import logo from './logo.svg';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Moralis from 'moralis';
import Menu from './features/Menu/Menu';
import Btn from './components/Btn/Btn';
import Chessboard from './features/Chessboard/Chessboard';
import FastMenu from './features/Menu/FastMenu';
import Banner from './features/Menu/Banner';

export const ethers = Moralis.web3Library;
export const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_NODE_URL);
const signer = provider.getSigner();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="App">    
        <Banner />  
        <Menu/>
        <div className="Body my-2">
          <FastMenu />
          <Chessboard />
        </div>
      </div>
    );
  }
}

export default App;
