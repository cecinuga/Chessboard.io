import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import ChessBoard from '../../artifacts/ChessBoard';
import { signer, ethers } from '../../App';
import { id } from 'moralis/node_modules/@ethersproject/hash';
import { Move, useMenu } from './chessAPI';

const initialState = { 
    lastMove:{ firstStep:'', piece:'', secondStep:'' },
    status:'',
    error:''
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
            state.error = action.error.message;
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