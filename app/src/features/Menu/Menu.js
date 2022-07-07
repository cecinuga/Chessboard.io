import Btn from '../../components/Btn/Btn';  
import BtnConnect from './BtnConnect';
import BtnMatchM from './BtnMatchM';
import React, { Component }  from 'react';

const navigation = [
  { name: 'Join', href:'', img:'', classes:' ml-4 ' ,current: false },
  { name: 'Tournament', href:'', img:'', classes:' ml-4 ' ,current: false },
]
const matchmaking = { name:'New Game', href:'', img:'', classes:' ml-4 ', current: false }
const connect = { names: ['Connect', 'Logout'], img:'', classes:' absolute right-0 ml-4 ' ,current: true }

export default function Menu() {
  return (
    <div className="Menu-Child bg-red-200 ">
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