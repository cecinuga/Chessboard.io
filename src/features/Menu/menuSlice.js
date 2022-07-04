import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout } from './menuAPI';

const initialState = { 
    id:'',
    address:'',
    status:''
}
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{

    },
    extraReducers:{

    }
});
export const menuReducer = menuSlice.reducer;