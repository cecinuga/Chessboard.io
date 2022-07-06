import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { 
    lastMove:{ firstStep:'', piece:'', secondStep:'' }
}
export const useMenu = state=>state.memu;



export const chessSlice = createSlice({
    name:'chess',
    initialState,
    reducers:{
        Move:(state, action)=>{ 
            if((state.lastMove.firstStep==''&&state.lastMove.secondStep=='')||(state.lastMove.firstStep!=''&&state.lastMove.secondStep!='')) { 
                state.lastMove.firstStep = action.payload.step;
                state.lastMove.piece = action.payload.piece;
                state.lastMove.secondStep = '';
            } else if(state.lastMove.firstStep!=''&&state.lastMove.secondStep=='') {
                state.lastMove.secondStep = action.payload.step;
            } 
        }
    },
    extraReducers:{

    }
});
export const { Move } = chessSlice.actions;
export const chessReducer = chessSlice.reducer;