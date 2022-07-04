import { useMoralis } from "react-moralis";
import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../app/store';
import { useMenu } from './menuSlice';

export default function BtnConnect({ id, names, href, img, classes, current }) {
    //const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    const menu = useSelector(useMenu(store.getState()))
    const dispatch = useDispatch();

    useEffect(() => {
      if (isAuthenticated) {
        document.getElementById('btn-connect-header').innerHTML=names[1];
      } else { 
        document.getElementById('btn-connect-header').innerHTML=names[0];
        dispatch()
      }
    }, [isAuthenticated]);

    return (
        <div className={"Btn-Connect inline-block mr-2 mt-2 bg-red-400 p-1 text-gray-200 rounded border-2 border-solid border-red-600 mb-2"+classes}>
            <button id="btn-connect-header" className="Connect-Link" onClick={()=>{  }} >{names[0]}</button>
            <img className="" src={img}></img>
        </div>
    );
}