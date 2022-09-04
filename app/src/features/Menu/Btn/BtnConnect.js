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
      <div className={"Btn-Connect inline-block mr-2 mt-3 bg-orange-600 hover:bg-orange-500 p-1 px-2 rounded-full border-2 border-solid text-white border-orange-800 mb-2 font-semibold absolute right-2"}>
          {(Auth=='login')?<BtnLogMenu name='Logout'/>:<BtnLogin name='Connect Wallet'/>}
      </div>
  );
}