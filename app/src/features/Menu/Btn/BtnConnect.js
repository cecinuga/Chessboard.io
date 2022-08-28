import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../app/store';
import { logHandler } from '../menuAPI';

export default function BtnConnect({ id, names, href, img, classes, current }) {
    const { isAuthenticated, authenticate, logout } = useMoralis();
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (isAuthenticated) {
        document.getElementById('btn-connect-header').innerHTML=names[1];
      } else { 
        document.getElementById('btn-connect-header').innerHTML=names[0];
      }
      if(store.getState().menu.status=='pending'){
        document.getElementById('btn-connect-header').children = <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      }
    }, [isAuthenticated]);

    return (
        <div className={"Btn-Connect inline-block mr-2 mt-2 bg-orange-600 p-1 px-2 rounded-full border-2 border-solid text-white border-orange-800 mb-2 font-semibold "+classes}>
            <button id="btn-connect-header" className="Connect-Link" onClick={()=>{ dispatch(logHandler({isAuthenticated, authenticate, logout})).then(()=>console.log(store.getState()))} }>{names[0]}</button>
            <img className="" src={img}></img>
        </div>
    );
}