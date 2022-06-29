import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../app/store';
//import { userSlice, login } from '../../features/userSlice.js';
//import setLogin from '../../features/userSlice.js';

export default function BtnConnect({ id, names, href, img, classes, current }) {
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (isAuthenticated) {
        document.getElementById('btn-connect-header').innerHTML=names[1];
      } else { 
        document.getElementById('btn-connect-header').innerHTML=names[0];
      }
    }, [isAuthenticated]);

    const toggleLogin = async () => {
      if (!isAuthenticated) {
        await authenticate({signingMessage: "Benvenuto in chessboard.io" })
          .then(function (_user) {
            //DISPATCH EVENT 
            store.dispatch({type:"LOGIN", payload:{id:_user.id, address:_user.get("ethAddress")}});
            console.log("logged in _user:", _user);
            console.log(_user.get("ethAddress"));
            console.log(store.getState());
          })
          .catch(function (error) {
            console.log(error);
          });
      } else { await logOut(); }
    }

    const logOut = async () => {
      await logout();
      store.dispatch({type:"LOGOUT"});
      console.log(store.getState());
      console.log("logged out");
    }

    return (
        <div className={"Btn-Connect inline-block mr-2 mt-2 bg-red-400 p-1 text-gray-200 rounded border-2 border-solid border-red-600 mb-2"+classes}>
            <button id="btn-connect-header" className="Connect-Link" onClick={()=>{ toggleLogin(); }} >{names[0]}</button>
            <img className="" src={img}></img>
        </div>
    );
}