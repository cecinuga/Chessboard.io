import { useMoralis } from "react-moralis";

export function fetchLogin(){
    return function(dispatch){
        const { authenticate } = useMoralis();
        return authenticate({signingMessage: "Benvenuto in chessboard.io" })
            .then(function(user){
                dispatch({type:"LOGIN", user:user})
            });
    }
}
export function fetchLogout(){
    return function(dispatch){
        const { logout } = useMoralis();
        return logout()
            .then(function(user){
                dispatch({type:"LOGOUT"})
            });
    }
}