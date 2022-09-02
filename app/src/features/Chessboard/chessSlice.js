import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import ChessBoard from '../../artifacts/ChessBoard';
import { signer, ethers } from '../../App';
import { id } from 'moralis/node_modules/@ethersproject/hash';
import { Move, useMenu } from './chessAPI';

const initialState = { 
    lastMove:{ firstStep:'', piece:'',piece2:'', secondStep:'',status:'' },
    points:{ my:0, enemy:0,
        points_table:{
            'p':1,
            'c':3,
            'a':3,
            't':5,
            'q':9
        }, 
    },
    chessboard:[
        ['t','c','a','k','q','c','a','t'],
        /*'1':{'0':'p','1':'p','2':'p','3':'p','4':'p','5':'p','6':'p','7':'p'},
        '2':{'0':'','1':'','2':'','3':'','4':'','5':'','6':'','7':''},
        '3':{'0':'','1':'','2':'','3':'','4':'','5':'','6':'','7':''},
        '4':{'0':'','1':'','2':'','3':'','4':'','5':'','6':'','7':''},
        '5':{'0':'','1':'','2':'','3':'','4':'','5':'','6':'','7':''},
        '6':{'0':'p','1':'p','2':'p','3':'p','4':'p','5':'p','6':'p','7':'p'},
    '7':{'0':'t','1':'c','2':'a','3':'k','4':'q','5':'c','6':'a','7':'t'}*/],
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
            if(action.payload.piece2!==null&&action.payload.piece2!==undefined) {
                state.graveyard.push(action.payload.piece2);
                state.points.enemy+=state.points.points_table[action.payload.piece2];
            }
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
                        if(action.payload.data.piece!==null&&action.payload.data.piece!==undefined){ 
                            state.graveyard.enemy.push(action.payload.data.piece)
                            state.points.my+=state.points.points_table[action.payload.data.piece];
                        }
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