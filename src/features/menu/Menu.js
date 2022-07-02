import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuSelector } from './menuSlice';
import Btn from './Btn';
import BtnConnect from './BtnConnect';

export function Menu() {
    const navigation = [
    { name: 'New Game', href:'', img:'', classes:' ml-4 ' ,current: false },
    { name: 'Join', href:'', img:'', classes:' ml-4 ' ,current: false },
    { name: 'Tournament', href:'', img:'', classes:' ml-4 ' ,current: false },
    ]
    const connect = { names: ['Connect', 'Logout'], img:'', classes:' absolute right-0 ml-4 ' ,current: true }
      
    const user = useSelector(menuSelector);
    const dispatch = useDispatch();

    return(
        <div className="Menu-Child bg-red-200">
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