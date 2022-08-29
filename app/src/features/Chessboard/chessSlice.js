import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import ChessBoard from '../../artifacts/ChessBoard';
import { signer, ethers } from '../../App';
import { id } from 'moralis/node_modules/@ethersproject/hash';
import { Move, useMenu } from './chessAPI';

const initialState = { 
    lastMove:{ firstStep:'', piece:'', secondStep:'',status:'' },
    points:{ white:'', black:'' },
    graveyard:{ white: '', black:'' },
    turner:'',
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
            state.lastMove.firstStep='';
            state.lastMove.piece='';
            state.lastMove.secondStep='';
            state.error = action.error.message;
        },
        [Move.fulfilled]: (state, action) => { 
            if(!action.payload.error){
                state.status='fulfilled';
                if((state.lastMove.firstStep==''&&state.lastMove.secondStep=='')||(state.lastMove.firstStep!='' && state.lastMove.secondStep!='')) { 
                    state.lastMove.firstStep = action.payload.step;
                    state.lastMove.piece = action.payload.piece;
                    state.lastMove.secondStep = '';
                } else if(state.lastMove.firstStep!=''&&state.lastMove.secondStep=='') {
                    if(state.lastMove.firstStep!=action.payload.data.step){
                        state.lastMove.secondStep = action.payload.data.step;
                        state.turner = action.payload.turner
                        state.lastMove.status='ok';
                    } else {state.lastMove.status='repeat';}
                } 
            } else { 
                state.status='notyturn';
                state.lastMove.firstStep = '';
                state.lastMove.secondStep = '';
                state.lastMove.piece = '';
            }
        }
    }
});
export const chessReducer = chessSlice.reducer;