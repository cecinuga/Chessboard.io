import { createSlice } from '@reduxjs/toolkit';

const initialState = {

}

export const chessboardReducer = createSlice({
    name:'chessboard',
    initialState,
    reducers: {
       changeData: (state, action)=>{

       }
    }
});

export const ChessboardReducer = chessboardReducer.reducer;
export const {changeData} = chessboardReducer.actions;