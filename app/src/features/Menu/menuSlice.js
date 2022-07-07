import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { 
    user:{
        id:'',
        ads:'',
        status:'',
    },
    matchmaking:{ status:'', },
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
        return data;
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
        [newGame.rejected]:state=>{ 
            state.matchmaking.status='rejected'
        },
        [newGame.fulfilled]:(state,action)=>{ 
            state.matchmaking.status='fulfilled'
        }

    }
});
export const menuReducer = menuSlice.reducer;