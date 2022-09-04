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
        [{l:'t',t:false},{l:'c',t:false},{l:'a',t:false},{l:'k',t:false},{l:'q',t:false},{l:'c',t:false},{l:'a',t:false},{l:'t',t:false}],
        [{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false}],
        [{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false}],
        [{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false}],
        [{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false}],
        [{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false}],
        [{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true}],
        [{l:'t',t:true},{l:'c',t:true},{l:'a',t:true},{l:'k',t:true},{l:'q',t:true},{l:'c',t:true},{l:'a',t:true},{l:'t',t:true}]
    ],
    graveyard:{ my: [], enemy:[] },
    turner:'',
    status:'',
    error:''
}
export const chessSlice = createSlice({
    name:'chess',
    initialState,
    reducers:{
        ResetChessboard: (state) => {
            state.chessboard = [
                [{l:'t',t:false},{l:'c',t:false},{l:'a',t:false},{l:'k',t:false},{l:'q',t:false},{l:'c',t:false},{l:'a',t:false},{l:'t',t:false}],
                [{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false},{l:'p',t:false}],
                [{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false}],
                [{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false}],
                [{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false}],
                [{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false},{l:'',t:false}],
                [{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true},{l:'p',t:true}],
                [{l:'t',t:true},{l:'c',t:true},{l:'a',t:true},{l:'k',t:true},{l:'q',t:true},{l:'c',t:true},{l:'a',t:true},{l:'t',t:true}]
            ]
            state.graveyard = {my:[], enemy:[]}
            state.turner = '';
            state.status = '';
            state.lastMove = {firstStep:'', secondStep:'', piece:'', piece2:''}
            state.points.my=0;
            state.points.enemy=0; 
        },
        EnemyMove: (state, action) => {
            state.lastMove.firstStep = action.payload.firstStep;
            state.lastMove.secondStep = action.payload.secondStep;
            state.lastMove.piece = action.payload.piece;
            state.lastMove.piece2 = action.payload.piece2;
            if(action.payload.firstStep!=undefined) {
                state.chessboard[action.payload.secondStep[1]][action.payload.secondStep[0]].t = state.chessboard[action.payload.firstStep[0]][action.payload.firstStep[1]].t;
                state.chessboard[action.payload.secondStep[1]][action.payload.secondStep[0]].l = action.payload.piece; 
                state.chessboard[action.payload.firstStep[1]][action.payload.firstStep[0]].l = '';
                state.chessboard[action.payload.firstStep[1]][action.payload.firstStep[0]].t = false;
            }
                
            if(action.payload.piece2!==null&&action.payload.piece2!==undefined&&action.payload.piece2!='') {
                state.graveyard.my.push(action.payload.piece2);
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

                        state.chessboard[action.payload.data.step[1]][action.payload.data.step[0]].t = state.chessboard[state.lastMove.firstStep[0]][state.lastMove.firstStep[1]].t;
                        state.chessboard[action.payload.data.step[1]][action.payload.data.step[0]].l = state.lastMove.piece;
                        state.chessboard[state.lastMove.firstStep[1]][state.lastMove.firstStep[0]].l = '';
                        state.chessboard[state.lastMove.firstStep[1]][state.lastMove.firstStep[0]].t = false;
                        
                        if(action.payload.data.piece!==null&&action.payload.data.piece!==undefined&&action.payload.data.piece!=''){ 
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
export const { EnemyMove, ResetChessboard } = chessSlice.actions;
export const chessReducer = chessSlice.reducer;