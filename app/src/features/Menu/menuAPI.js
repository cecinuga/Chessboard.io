import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import Moralis from 'moralis';
import { useNewMoralisObject } from "react-moralis";
import { ethers, provider, signer } from '../../App';
import ChessBoard from '../../artifacts/ChessBoard'

export const logHandler = createAsyncThunk(
    "menu/logHandler",
    async ( data )=>{
        const { isAuthenticated, authenticate, logout } = data;
        if(!isAuthenticated) {
            return await authenticate({signingMessage:'Benvenuto in chesssboard.io'})
                .then(user=>{return {id:user.id, ads:user.get('ethAddress'), message:{}}});
        } 
        else {
            return await logout();
        }
    }
)
export const newGame = createAsyncThunk(
    "menu/newGame",
    async ( data )=>{
        //GESTIRE IL MATCHMAKING!!!
        return await data.fetch()
            .then( 
                async (users)=>{
                    if(users.length < 0) {//CAMBIARE IF
                        //scelgo lo sfidante
                        //FAI SCEGLIERE ALL'UTENTE
                        const WRenemy = users[0];

                        //deploy the smart contract 
                        console.log('Player 1: ',await signer.getAddress())
                        console.log('Player 2: ',WRenemy.get('address'))

                        const Chessboard = new ethers.ContractFactory(ChessBoard.abi, ChessBoard.bytecode, signer);
                        const chessboard = await Chessboard.deploy(signer.getAddress(), WRenemy.get('address'))

                        console.log(chessboard)
                        return { chessboard:chessboard.address, enemy:WRenemy.get('address') }
                    } else if(users.length!=0) {//CAMBIARE IF
                        //mi metto in coda 
                        const User = Moralis.Object.extend("WRoom");
                        const waiting_user = new User();
                        waiting_user.save({
                            status:'ok', 
                            address: await signer.getAddress()
                            })
                            .then(
                                async (user)=>{
                                    const block = await provider.getBlockNumber()
                                    const { transactions } = await provider.getBlockWithTransactions(block)
                                    transactions.map((tx)=>{ 
                                        if(tx.creates!=undefined) {
                                            //controllo se 
                                            //l'indirizzo del contratto è una ChessBoard
                                            console.log(tx.creates)
                                            const cont = new ethers.Contract(tx.creates, ChessBoard.abi, signer)
                                                .then(()=>{})
                                                .catch((err)=>console.log(err))
                                        }
                                    })
                                },
                                (error)=>{console.log(error)})
                        //punto alla partita
                        
                        
                        //quando vengo scelto, mi tolgo dalla coda
                        return { chessboard:'', enemy:'' }

                    }
                }
            )
    }
)
