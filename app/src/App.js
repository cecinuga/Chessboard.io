import logo from './logo.svg';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Moralis from 'moralis';
import {ethers} from 'ethers'

import Menu from './features/Menu/Menu';
import Btn from './components/Btn/Btn';
import Chessboard from './features/Chessboard/Chessboard';
import Banner from './features/Menu/Banner';

export { ethers }
export const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
export const signer = provider.getSigner();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="App">     
        <Menu/>
        <div className="Body bg-slate-600">
          <Chessboard />
        </div>
      </div>
    );
  }
}

export default App;
