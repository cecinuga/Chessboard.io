import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Login, Logout, selectUser } from './menuSlice';

export function Menu() {
    const user = useSelector(selectUser);
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