import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Wroom } from './WRoom';
import {store} from '../../app/store'
import { logHandler, newGame } from './menuAPI'

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
    },
    status:'',
}
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
        gameFound:(state,action)=>{
            console.log('mi hanno dispatchato...')
            console.log(action.payload)
            state.matchmaking.chessboard=action.payload.chessboard;
            state.matchmaking.enemy=action.payload.player;
            state.matchmaking.message.status='letsplaytg';
        },
        showMMConfig:(state)=>{
            state.matchmaking.message.status='foundaplayer';
        }
    },
    extraReducers:{
        [logHandler.pending]:state=>{ 
            state.user.message.status='pending'
        },
        [logHandler.rejected]:state=>{ 
            state.user.message.status='rejected'
            state.status='logerror'
        },
        [logHandler.fulfilled]:(state,action)=>{ 
            state.user = action.payload
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
        }

    }
});
export const { gameFound, showMMConfig } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;