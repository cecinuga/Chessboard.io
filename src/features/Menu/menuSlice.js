import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout } from './menuAPI';

const initialState = { 
    id:'',
    address:'',
    status:''
}
export const useMenu = (state)=>state.memu;
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{

    },
    extraReducers:{

    }
});
