import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import ChessBoard from '../../artifacts/ChessBoard';

export const useMenu = state=>state.memu;
export const Move = createAsyncThunk(
    "chess/move",
    async ( data ) => { 
        if((store.getState().chess.lastMove.firstStep!=''&&store.getState().chess.lastMove.secondStep!='')){
        // RUN CONTRACT MORALIS FUNCTION
        
        }
        return data;
    }
) 

const initialState = { 
    lastMove:{ firstStep:'', piece:'', secondStep:'' },
    status:''
}
export const chessSlice = createSlice({
    name:'chess',
    initialState,
    reducers:{
    },
    extraReducers:{
        [Move.pending]: state => { 
            state.status='pending';
        },
        [Move.rejected]: (state, action) => { 
            state.status='rejected';
            state.error = action.payload.error;
        },
        [Move.fulfilled]: (state, action) => { 
            state.status='fulfilled';
            if((state.lastMove.firstStep==''&&state.lastMove.secondStep=='')||(state.lastMove.firstStep!=''&&state.lastMove.secondStep!='')) { 
                state.lastMove.firstStep = action.payload.step;
                state.lastMove.piece = action.payload.piece;
                state.lastMove.secondStep = '';
            } else if(state.lastMove.firstStep!=''&&state.lastMove.secondStep=='') {
                state.lastMove.secondStep = action.payload.step;
            } 
        }
    }
});
export const chessReducer = chessSlice.reducer;