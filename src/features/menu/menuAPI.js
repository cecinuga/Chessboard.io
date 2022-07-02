import { useMoralis } from "react-moralis";

export function fetchLogin(){
    const { authenticate, isAuthenticated } = useMoralis();
    if(!isAuthenticated){ return await authenticate({ signingMessage: "Benvenuto in chessboard.io" });}
}

export function fetchLogout(){
    const { logout, isAuthenticated } = useMoralis();
    if(isAuthenticated){ return await logout(); }
}