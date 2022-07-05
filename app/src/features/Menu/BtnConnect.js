import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../app/store';
import { Login, Logout } from './menuSlice';

export default function BtnConnect({ id, names, href, img, classes, current }) {
    const { isAuthenticated, authenticate, logout } = useMoralis();
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (isAuthenticated) {
        document.getElementById('btn-connect-header').innerHTML=names[1];
      } else { 
        document.getElementById('btn-connect-header').innerHTML=names[0];
      }
    }, [isAuthenticated]);

    const toggleLogin = async ()=>{
      if(!isAuthenticated) 
        await authenticate({signingMessage:"Benvenuto in chessboard.io"})
          .then(user=>{ 
            store.dispatch(Login({id:user.id, ads:user.get('ethAddress')}))
            console.log(store.getState())
          });
      else { 
        await logout()
          .then(()=>{store.dispatch(Logout());})
          .then(()=>{console.log(store.getState());});
      }
    }

    return (
        <div className={"Btn-Connect inline-block mr-2 mt-2 bg-red-400 p-1 text-gray-200 rounded border-2 border-solid border-red-600 mb-2"+classes}>
            <button id="btn-connect-header" className="Connect-Link" onClick={()=>{ toggleLogin();} }>{names[0]}</button>
            <img className="" src={img}></img>
        </div>
    );
}