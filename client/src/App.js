import logo from './logo.svg';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import Btn from './components/Btn/Btn';
import ConnectBtn from './components/Btn/BtnConnect';
import Chessboard from './components/Chessboard/Chessboard';
import FastMenu from './components/Menu/FastMenu';
import Banner from './components/Menu/Banner';

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
