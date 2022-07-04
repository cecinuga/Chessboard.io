import { useMoralis } from "react-moralis";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logHandler = createAsyncThunk("menu/logHandler", ()=>{ 
    const {isAuthenticated, authenticate, logout } = useMoralis();
    if(isAuthenticated){
        return authenticate({signingMessage: "Benvenuto in chessboard.io" })
        .then(user => user);
    } else {
        return logout();
    }
});
export const useMenu = state=>state.memu;
