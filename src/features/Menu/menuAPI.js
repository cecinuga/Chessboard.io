import { useMoralis } from "react-moralis";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLogin = createAsyncThunk("menu/login", ()=>{ 
    const { authenticate } = useMoralis();
    return authenticate({signingMessage: "Benvenuto in chessboard.io" })
        .then(user => user);
});
export const fetchLogout = createAsyncThunk("menu/logout", ()=>{ 
    const { logout } = useMoralis();
    return logout();
});
export const useMenu = state=>state.memu;
