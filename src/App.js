import React from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './features/menu/Banner';
import {Menu} from './features/menu/Menu';

function App() {
  return (
    <div className="App">
      <Banner />
      <Menu />
    </div>
  );
}

export default App;
