import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../app/store';
import { logIn } from '../menuAPI';

export default function BtnLogin(props){
    const { authenticate } = useMoralis();
    const dispatch = useDispatch();
    
    return(
        <button id="btn-connect-header-login" className="Connect-Link-sususu" onClick={()=>{ 
            dispatch(logIn({authenticate})).then(()=>console.log(store.getState()));} 
        }>
            {props.name}
        </button>
    );
}