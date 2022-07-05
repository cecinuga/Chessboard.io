import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { 
    user:{
        id:'',
        ads:'',
    },
}
export const useMenu = state=>state.memu;
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
        Login:(state, action)=>{ 
            state.user=action.payload
        },
        Logout:(state)=>{ 
            state.user = {id:'', ads:''};
        }
    },
    extraReducers:{
    }
});
export const { Login, Logout } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;