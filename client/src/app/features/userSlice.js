import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userState = {
    id:"",
    address:""
}
export const userSlice = createSlice({
    name:"user",
    reducers:{ 
        userLogin:(state, action)=>{
            state.id=action.payload.id;
            state.address=action.payload.address;
            return state;
        },
        userLogout:(state, action)=>{
            state.id="";
            state.address="";
            return state;
        },
    },
    initialState:userState
})

export const { userLogin, userLogout } = userSlice.actions;
export const userReducer = userSlice.reducer;