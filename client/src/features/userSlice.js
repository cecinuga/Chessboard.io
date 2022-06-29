import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    address: '',
}

const setLogin = createAsyncThunk(
    'user/login',
    async(thunkAPI)=>{
        return thunkAPI
    }
)

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        login: (state, action)=>{ 
            state._id = action._id;
            state.address = action.address;
        },
        logout: (state)=>{ 
            state._id = '';
            state.address = '';
        }
    }
});
export const userReducer = userSlice.reducer;
export const {login, logout} = userSlice.actions;
export default setLogin;