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
        message:{status:'',error:''},
    },
    status:'',
}
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
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
            state.matchmaking.message.status='fulfilled'
            state.matchmaking.chessboard=action.payload.chessboard;
            state.matchmaking.enemy=action.payload.enemy;
        }

    }
});
export const menuReducer = menuSlice.reducer;