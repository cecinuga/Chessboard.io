import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLogin, fetchLogout } from './menuAPI'
import { useMoralis } from "react-moralis";

const initialState = {
    id: '',
    address:'',
    status: ''
};

export const Login = createAsyncThunk(
    'menu/fetchLogin', 
    async () => {
        const res = await fetchLogin();
        return res;
    }
);
export const Logout = createAsyncThunk(
    'menu/fetchLogout', 
    async () => {
        const res = await fetchLogout();
        return res;
    }
);

export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.status = 'loadingin';
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.status = 'in';
                state.id=action.payload.id;
                state.address=action.payload.address;
            })
            .addCase(Logout.pending, (state) => {
                state.status = 'loadingout';
            })
            .addCase(Logout.fulfilled, (state, action) => {
                state.status = 'out';
                state.id='';
                state.address='';
            })
    },
});
export const selectStatus = (state) => state.status;
export const selectUser = (state) => state;

export const LogHandler = () => (dispatch, getState) => {
    const { isAuthenticated } = useMoralis();
    const status = selectStatus(getState());
    if( !isAuthenticated&&status=='out'){  return dispatch(Login());}
    else if (isAuthenticated&&status=='in'){ return dispatch(Logout());}
}

export default menuSlice.reducer;