import { createSlice } from '@reduxjs/toolkit';
import { logHandler } from './menuAPI';

const initialState = { 
    user:{
        id:'',
        address:'',
    },
    status:''
}
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{

    },
    extraReducers:{
        [logHandler.pending]:state=>{
            state.status='pending';
        },
        [logHandler.rejected]:state=>{
            state.status='rejected';
        },
        [logHandler.fulfilled]:(state, action)=>{
            state.status='fulfilled';
            state.user = action.payload
        }
    }
});
export const menuReducer = menuSlice.reducer;