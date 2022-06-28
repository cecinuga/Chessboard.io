import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lastMove:{
        firstStep: '',
        piece:'',
        secondStep: '',
    },
    chessboard: { }
}

export const MoveReducer = createSlice({
    name:'lastMove',
    initialState,
    reducers: {
        Step: (state, action)=>{ 
            if(state.firstStep==''&&state.secondStep==''){ 
                state.firstStep = action.step }
            else if(state.firstStep!=''&&state.secondStep==''){ 
                state.secondStep = action.step
                //Chiama la funzione dello smart contract. 
            }
        },
    }
});

export const lastMoveReducer = MoveReducer.reducer;
export const {Step} = MoveReducer.actions;