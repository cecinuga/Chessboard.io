import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userState = {
    id:"",
    address:""
}
const userSlice = createSlice({
    name:"user",
    reducers:{ 
        login:(state, action)=>{

        },
        logout:(state, action)=>{

        },
    }
})