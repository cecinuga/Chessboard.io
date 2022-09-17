import Btn from '../../components/Btn/Btn';  
import BtnConnect from './Btn/BtnConnect';
import BtnDonate from './Btn/BtnDonate';
import React, { Component }  from 'react';
import { store } from '../../app/store';
import  logo  from '../../public/logo1.webp'

const navigation = [
  { name: 'Documentation', href:'', img:'', classes:' ml-4 ' ,current: false },
  { name: 'Tournament', href:'', img:'', classes:' ml-4 ' ,current: false },
]
const donate = { name:'Donate', href:'', img:'', classes:' ml-4 ', current: false }
const connect = { names: ['Connect Wallet', 'Logout'], img:'', classes:' absolute right-0 ml-4 ' ,current: true }

export default function Menu() {
  console.log(store.getState())
  return (
    <div className="Menu-Child bg-stone-400">
      <div className="w-3/6 inline-block">
        <a href="http://localhost:3000"  className="inline-block font-bold font-6xl ml-12 mr-6 text-white relative top-1">
          <img className="w-12 h-12 inline-block mb-2" src={logo}></img>
          dChess.io
        </a>
      </div>
      <div className="w-3/6 text-right inline-block">
        <BtnConnect names={connect.names} img={connect.img} classes={connect.classes}/>
      </div>
    </div>
  );
}
/**
 * <BtnDonate name={donate.name} classes={donate.classes} />
      { 
        navigation.map((btn)=>{ 
          return(
            <Btn key={btn.name.toLowerCase()} name={btn.name} href={btn.href} img={btn.img} classes={btn.classes} current={btn.current} />
          );
        })
      }

 */