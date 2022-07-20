import { signer, ethers } from '../../App';
import ChessBoard from '../../artifacts/ChessBoard';
import { store } from '../../app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const useMenu = state=>state.memu;
export const Move = createAsyncThunk(
    "chess/move",
    async ( data ) => { 
        const chessboard_address = "0x9DB6CFb2b5E39dbc0Bcf3C7a04C59eA12cb5212e"
        if(
            store.getState().chess.lastMove.firstStep!=''&&
            store.getState().chess.lastMove.secondStep==''&&
            /*store.getState().menu.matchmaking.chessboard*/chessboard_address!=''
        ){
            const chessboard = new ethers.Contract(/*store.getState().menu.matchmaking.chessboard*/chessboard_address, ChessBoard.abi, signer)
            const x1 = store.getState().chess.lastMove.firstStep[0];const y1 = store.getState().chess.lastMove.firstStep[1];
            const tx = await chessboard.connect(signer).Move(
                    [Number(x1),Number(y1)],
                    [Number(data.step[0]),Number(data.step[1])],
                    { gasLimit:150000 }
            )
            tx.wait()
            console.log(tx)
        // RUN CONTRACT MORALIS FUNCTION
        }
        return data;
    }
) 
