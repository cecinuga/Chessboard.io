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
const matchmaking = { name:'New Game', href:'', img:'', classes:' ml-4 ', current: false }
const connect = { names: ['Connect', 'Logout'], img:'', classes:' absolute right-0 ml-4 ' ,current: true }

export default function Menu() {
  console.log(store.getState())
  return (
    <div className="Menu-Child bg-amber-200 ">
      <img className="w-12 h-12 inline-block" src={logo}></img>
      <div className="inline-block font-semibold font-4xl ml-2 text-orange-700">dChess.io</div>
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