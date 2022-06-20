import { useMoralis } from "react-moralis";
import React, { useEffect } from 'react';
import store from '../app/store';

export default function BtnConnect({ id, names, href, img, classes, current }) {
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    useEffect(() => {
      if (isAuthenticated) {
        document.getElementById('btn-connect-header').innerHTML=names[1];
      } else { 
        document.getElementById('btn-connect-header').innerHTML=names[0];
      }
    }, [isAuthenticated]);

    const toggleLogin = async () => {
      if (!isAuthenticated) {
        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));


          })
          .catch(function (error) {
            console.log(error);
          });
      } else { await logOut(); }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

    return (
        <div className={"Btn-Connect inline-block mr-2 mt-2 bg-red-400 p-1 text-gray-200 rounded border-2 border-solid border-red-600 mb-2"+classes}>
            <button id="btn-connect-header" className="Connect-Link" onClick={()=>{ toggleLogin(); }} >{names[0]}</button>
            <img className="" src={img}></img>
        </div>
    );
}