import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../app/store';
import BtnLogMenu from './BtnLogMenu';
import BtnLogin from './BtnLogin';

export default function BtnConnect() {
  const { isAuthenticated, authenticate, logout } = useMoralis();
  const dispatch = useDispatch();
  const [Auth, setAuth] = useState(store.getState().menu.status)

  store.subscribe(async()=>{
    if(store.getState().menu.status=='logout'){
      setAuth(store.getState().menu.status)
    }
    if(store.getState().menu.status=='login'){
      setAuth(store.getState().menu.status)
    }
})

  return (
      <div className={"Btn-Connect inline-block mr-2 bg-slate-600 hover:bg-slate-500 p-2 rounded-xl border-2 border-solid text-white border-slate-800 mb-2 font-semibold"}>
          {(Auth=='login')?<BtnLogMenu name='Logout'/>:<BtnLogin name='Connect Wallet'/>}
      </div>
  );
}