import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import Moralis from 'moralis';
import { useNewMoralisObject } from "react-moralis";
import { ethers, provider, signer } from '../../App';
import ChessBoard from '../../artifacts/ChessBoard'
import { matchPrizes } from '../../fun/matchmaking';

export const logHandler = createAsyncThunk(
    "menu/logHandler",
    async ( data )=>{
        const { isAuthenticated, authenticate, logout } = data;
        if(!isAuthenticated) {
            return await authenticate({signingMessage:'Benvenuto in chesssboard.io'})
                .then(user=>{
                    return {id:user.id, ads:user.get('ethAddress'), message:{}}
                });
        } 
        else {
            return await logout()
                .then(()=>{return {id:'', ads:'', message:{status:'', error:''}}});
        }
    }
)

export const newGame = createAsyncThunk(
    "menu/newGame",
    async ( data )=>{
        //GESTIRE IL MATCHMAKING!!!
        console.log('Invio richiesta al server')
        const fetchWUser = new Moralis.Query("WRoom")
        const fetchWUserQuery = await fetchWUser
                                .equalTo("status","ok")
                                .greaterThan("quote", Number(data.from))
                                .lessThan("quote", Number(data.to))
        console.log(fetchWUserQuery)

        return await fetchWUserQuery.find()
            .then( 
                async (users)=>{
                    //INSERIRE CRITERIO PER SCELTA SFIDANTE
                    if(users.length > 0) {//CAMBIARE IF
                        const WRenemy = users[0];

                        //deploy the smart contract 
                        console.log('Player 1: ',await signer.getAddress())
                        console.log('Player 2: ',WRenemy.get('address'))
                        console.log('deployo la partita....')

                        const Chessboard = new ethers.ContractFactory(ChessBoard.abi, ChessBoard.bytecode, signer);
                        const chessboard = await Chessboard.deploy(signer.getAddress(), WRenemy.get('address'))
                        
                        const Games = Moralis.Object.extend("Games");
                        const new_chessboard = new Games();

                        new_chessboard.save({
                            chessboard:chessboard.address, 
                            player1:await signer.getAddress(),
                            player2:WRenemy.get('address'),
                            quote:WRenemy.get('quote')
                        }).then(
                            (chess)=>{console.log(chess)}, 
                            (error)=>{console.log(error)}
                        )
                        console.log(chessboard)
                        return { chessboard:chessboard.address, enemy:WRenemy.get('address'), from:data.from, to:data.to, quote:WRenemy.get('quote') }
                    } else if(users.length==0) {//CAMBIARE IF
                        //mi metto in coda 
                        console.log('mi metto in fila...')
                        const User = Moralis.Object.extend("WRoom");
                        const waiting_user = new User();
                        const quote = matchPrizes(data.from, data.to)

                        const user = await waiting_user.save({
                            status:'ok', 
                            address: await signer.getAddress(),
                            prizefrom: Number(data.from), 
                            prizeto: Number(data.to),
                            quote: quote,
                        });   
                                       
                        return { chessboard:'', enemy:'', from:data.from, to:data.to, quote:quote }
                    }
                }
            )
    }
)
