import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import ChessBoard from '../../artifacts/ChessBoard';
import { signer, ethers } from '../../App';
import { id } from 'moralis/node_modules/@ethersproject/hash';
import { Move, useMenu } from './chessAPI';

const initialState = { 
    lastMove:{ firstStep:'', piece:'',piece2:'', secondStep:'',status:'' },
    points:{ my:0, enemy:0 },
    graveyard:{ my: [], enemy:[] },
    turner:'',
    status:'',
    error:''
}
export const chessSlice = createSlice({
    name:'chess',
    initialState,
    reducers:{
        EnemyMove: (state, action) => {
            state.lastMove.firstStep = action.payload.firstStep;
            state.lastMove.secondStep = action.payload.secondStep;
            state.lastMove.piece = action.payload.piece;
            state.lastMove.piece2 = action.payload.piece2;
            if(action.payload.piece2!==null&&action.payload.piece2!==undefined) state.graveyard.my.push(action.payload.piece2);
            state.lastMove.status = 'enemynextmove';
        }
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
                    state.lastMove.firstStep = action.payload.data.step;
                    state.lastMove.piece = action.payload.data.piece;
                    state.lastMove.status='nextmovefs';
                    state.lastMove.secondStep = '';
                } else if(state.lastMove.firstStep!=''&&state.lastMove.secondStep=='') {
                    if(state.lastMove.firstStep!=action.payload.data.step){
                        state.lastMove.secondStep = action.payload.data.step;
                        state.lastMove.piece2 = action.payload.data.piece;
                        if(action.payload.data.piece!==null&&action.payload.data.piece!==undefined){ state.graveyard.enemy.push(action.payload.data.piece)}
                        state.turner = action.payload.turner;
                        state.lastMove.status='nextmove';
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
export const { EnemyMove } = chessSlice.actions;
export const chessReducer = chessSlice.reducer;