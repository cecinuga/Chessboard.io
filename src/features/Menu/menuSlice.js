import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout } from './menuAPI';

const initialState = { 
    user:{
        id:'',
        ads:'',
    },
    status:'',
    error:'',
}
export const logHandler = createAsyncThunk("menu/logHandler", (isAuthenticated)=>{ 
    if(!isAuthenticated){
        return login();
    } else {
        return logout();
    }
});
export const useMenu = state=>state.memu;
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{

    },
    extraReducers:{
        [logHandler.pending]:state=>{
            state.status='pending';
        },
        [logHandler.rejected]:(state, action)=>{
            state.status='rejected';
            state.error=action.error.message
        },
        [logHandler.fulfilled]:(state, action)=>{
            state.status='fulfilled';
            state.user = action.payload
        }
    }
});
export const menuReducer = menuSlice.reducer;