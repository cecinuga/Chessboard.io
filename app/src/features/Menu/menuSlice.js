import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { 
    user:{
        id:'',
        ads:'',
    },
    status:''
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

export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
    },
    extraReducers:{
        [logHandler.pending]:state=>{ 
            state.status='pending'
        },
        [logHandler.rejected]:state=>{ 
            state.status='rejected'
        },
        [logHandler.fulfilled]:(state,action)=>{ 
            state.status='fulfilled'
            state.user = action.payload
        }
    }
});
export const menuReducer = menuSlice.reducer;