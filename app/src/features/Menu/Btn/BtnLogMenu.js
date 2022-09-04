import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../app/store';
import { logOut } from '../menuAPI';
import { ResetChessboard } from "../../Chessboard/chessSlice";

export default function BtnLogMenu(props){
    const { logout } = useMoralis();
    const dispatch = useDispatch();
    
    return(
        <button id="btn-connect-header-logout" className="Connect-Link" onClick={()=>{ 
            dispatch(logOut({logout})).then(()=>console.log(store.getState()));
            dispatch(ResetChessboard())
        }}>
            {props.name}
        </button>
    );
}