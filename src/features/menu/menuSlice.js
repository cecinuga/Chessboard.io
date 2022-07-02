import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name:'menu',
    initialState:{
        id:'',
        user:'',
        status:'',
    },
    reducer:{

    },
    extraReducer:{

    }
});
export const menuReducer = menuSlice.reducer
export const menuSelector = (state) => state.menu;