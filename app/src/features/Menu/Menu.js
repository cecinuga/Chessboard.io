import Btn from '../../components/Btn/Btn';  
import BtnConnect from './Btn/BtnConnect';
import BtnMatchM from './Btn/BtnMatchM';
import React, { Component }  from 'react';
import { store } from '../../app/store';
import  logo  from '../../public/logo1.webp'

const navigation = [
  { name: 'Join', href:'', img:'', classes:' ml-4 ' ,current: false },
  { name: 'Tournament', href:'', img:'', classes:' ml-4 ' ,current: false },
]
const matchmaking = { name:'Donate', href:'', img:'', classes:' ml-4 ', current: false }
const connect = { names: ['Connect Wallet', 'Logout'], img:'', classes:' absolute right-0 ml-4 ' ,current: true }

export default function Menu() {
  console.log(store.getState())
  return (
    <div className="Menu-Child bg-gradient-to-r from-amber-300 to-amber-200">
      <a href="http://localhost:3000"  className="inline-block font-semibold font-6xl ml-2 mr-6 text-orange-800 relative top-1">
        <img className="w-12 h-12 inline-block mb-2" src={logo}></img>
        dChess.io
      </a>
      <BtnMatchM name={matchmaking.name} classes={matchmaking.classes} />
      { 
        navigation.map((btn)=>{ 
          return(
            <Btn key={btn.name.toLowerCase()} name={btn.name} href={btn.href} img={btn.img} classes={btn.classes} current={btn.current} />
          );
        })
      }
      <BtnConnect names={connect.names} img={connect.img} classes={connect.classes}/>
    </div>
  );
}