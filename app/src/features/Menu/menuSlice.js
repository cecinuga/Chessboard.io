import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Wroom } from './WRoom';
import { ethers } from '../../App';
import ChessBoard from '../../artifacts/ChessBoard'
import {store} from '../../app/store'

const initialState = { 
    user:{
        id:'',
        ads:'',
        status:'',
    },
    matchmaking:{ status:'',error:'', enemy:''},
}
export const useMenu = state=>state.menu;

export const logHandler = createAsyncThunk(
    "menu/logHandler",
    async ( data )=>{
        const { isAuthenticated, authenticate, logout } = data;
        if(!isAuthenticated) {
            return await authenticate({signingMessage:'Benvenuto in chesssboard.io'})
                .then(user=>{return {id:user.id, ads:user.get('ethAddress')}});
        } 
        else {
            return await logout();
        }
    }
)
export const newGame = createAsyncThunk(
    "menu/newGame",
    async ( data )=>{
        //GESTIRE IL MATCHMAKING!!!
        await data.fetch()
            .then( 
                async (users)=>{
                    if(users.length > 0) {
                        //scelgo lo sfidante
                        const WRenemy = users[0];
                        //deploy the smart contract
                    } else {
                        //mi metto in coda
                        //aspetto di essere scelto
                        //quindi uso le Polygon Api per puntare alla partita deployata con il mio indirizzo
                        //quando vengo scelto, mi tolgo dalla coda
                    }
                }
            )
    }
)
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
    },
    extraReducers:{
        [logHandler.pending]:state=>{ 
            state.user.status='pending'
        },
        [logHandler.rejected]:state=>{ 
            state.user.status='rejected'
        },
        [logHandler.fulfilled]:(state,action)=>{ 
            state.user.status='fulfilled'
            state.user = action.payload
        },
        [newGame.pending]:state=>{ 
            state.matchmaking.status='pending'
        },
        [newGame.rejected]:(state, action)=>{ 
            state.matchmaking.status='rejected'
            state.matchmaking.error=action.error.message;
        },
        [newGame.fulfilled]:(state,action)=>{ 
            state.matchmaking.status='fulfilled'
        }

    }
});
export const menuReducer = menuSlice.reducer;