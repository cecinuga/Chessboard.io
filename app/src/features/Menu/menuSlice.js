import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Wroom } from './WRoom';
import {store} from '../../app/store'
import { logIn, logOut, newGame, payGame } from './menuAPI'

export const useMenu = state=>state.menu;
const initialState = { 
    user:{
        id:'',
        ads:'',
        message:{status:'',error:''},
    },
    matchmaking:{ 
        enemy:'',
        chessboard:'',
        message:{status:'letsgo!',error:''},
        quote:'',
        team:''
    },
    status:'',
}
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
        RestartGame:(state,action)=>{
            state.matchmaking.message.status='letsgo!'
        },
        gameFound:(state,action)=>{
            console.log('mi hanno dispatchato...')
            state.matchmaking.chessboard=action.payload.chessboard;
            state.matchmaking.enemy=action.payload.player;
            state.matchmaking.message.status='letsplaytg';
        },
        showMMConfig:(state)=>{
            state.matchmaking.message.status='foundaplayer';
        },
        payedGame:(state)=>{
            state.matchmaking.message.status='payed';
        }
    },
    extraReducers:{
        [logIn.pending]:state=>{ 
            state.user.message.status='pending'
        },
        [logIn.rejected]:state=>{ 
            state.user.message.status='rejected'
            state.status='logerror'
        },
        [logIn.fulfilled]:(state,action)=>{ 
            state.user = action.payload
            state.status='login'
        },
        [logOut.pending]:state=>{ 
            state.user.message.status='pending'
        },
        [logOut.rejected]:state=>{ 
            state.user.message.status='rejected'
            state.status='logerror'
        },
        [logOut.fulfilled]:(state,action)=>{ 
            state.matchmaking.enemy='';
            state.matchmaking.chessboard='';
            state.matchmaking.quote=0;
            state.matchmaking.message.status='letsgo!';
            state.matchmaking.from=0;
            state.matchmaking.to=0;
            state.status='logout';
        },
        [newGame.pending]:state=>{ 
            state.matchmaking.message.status='pending'
        },
        [newGame.rejected]:(state, action)=>{ 
            state.matchmaking.message.status='rejected'
            state.matchmaking.message.error=action.error.message
            console.log(state.matchmaking.message.error)
            state.status='matcherror'
        },
        [newGame.fulfilled]:(state,action)=>{ 
            if(action.payload.chessboard!=''&&action.payload.enemy!=''){
                state.matchmaking.message.status='letsplay'
            }
            else if(action.payload.chessboard==''&&action.payload.enemy=='') {
                state.matchmaking.message.status='waiting'
            }
            state.matchmaking.chessboard=action.payload.chessboard;
            state.matchmaking.enemy=action.payload.enemy;
            state.matchmaking.from=action.payload.from;
            state.matchmaking.to=action.payload.to;
            state.matchmaking.quote=action.payload.quote;
            state.matchmaking.team=action.payload.team;
        }

    }
});
export const { gameFound, showMMConfig, payedGame, RestartGame } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;