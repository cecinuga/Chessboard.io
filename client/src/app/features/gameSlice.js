import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const gameState = {
    chessboard: [[{ piece:"", team:"", color:"" }]],
    lastMove:{firstStep:"", piece:"", secondMove:""},
    graveyard: [[{ piece: "", team:"" }]],
}   

export const gameSlice = createSlice({ 
    name:"game",
    reducers:{
        move: (state, action) => {
            return state;
        },
        lastMove: (state, action) => {
            if(state.lastMove.firstStep==''&&state.lastMove.secondStep==''){ state.lastMove.firstStep=action.payload.coo;state.lastMove.piece=action.payload.piece;}
            else if(state.lastMove.firstStep!=''&&state.lastMove.secondStep==''){ state.lastMove.secondStep=action.payload.coo;}
            return state;
        }
    },
    initialState: gameState,
})

export const { move, lastMove } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;