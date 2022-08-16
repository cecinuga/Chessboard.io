import { signer, ethers, provider } from '../../App';
import { Moralis } from 'moralis'
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
            store.getState().menu.matchmaking.chessboard!=''
        ){ 
            //const chessboard_address = "0x388d502DEe9A317D498c8382C3B7261Ae6471452"
            const chessboard = new ethers.Contract(store.getState().menu.matchmaking.chessboard/*chessboard_address*/   , ChessBoard.abi, signer)
            console.log(chessboard)
            console.log('chessboard: ',chessboard.address)

            const x1 = store.getState().chess.lastMove.firstStep[0];const y1 = store.getState().chess.lastMove.firstStep[1];
            console.log(x1, y1);
            console.log(data.step[0], data.step[1])

            //Controlla che il turner sia uguale al tuo indirizzo
            const Turner = Moralis.Object.extend("Games");
            const query = new Moralis.Query(Turner);
            query
                .equalTo("chessboard",store.getState().menu.matchmaking.chessboard)
                .equalTo("turner",await signer.getAddress())
            const res = await query.find();
            
            console.log('res')
            console.log(res)
            
            if(res.length){
                const tx = await chessboard.connect(signer).Move(
                        [Number(x1),Number(y1)],
                        [Number(data.step[0]),Number(data.step[1])],
                        { gasLimit:150000 }
                )
                
                await tx.wait()
                console.log(tx)

                //Connettiti al DB e cambia lastFirstStep, lastSecondStep, e a turner metti l'indirizzo dell'avversario
                const updateGame = [
                    { filter: { chessboard:chessboard.address, turner:await signer.getAddress() }, update: {lastFirstStep: String(x1+y1),lastSecondStep: String(data.step[0]+data.step[1]),turner:store.getState().menu.matchmaking.enemy} }
                ]
                Moralis.bulkUpdate("Games", updateGame);

            }
        }
        return data;
    }
) 