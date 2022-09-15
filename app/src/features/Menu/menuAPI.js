import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import Moralis from 'moralis';
import { useNewMoralisObject } from "react-moralis";
import { ethers, provider, signer } from '../../App';
import ChessBoard from '../../artifacts/ChessBoard'
import { matchPrizes } from '../../fun/matchmaking';

export const logIn = createAsyncThunk(
    "menu/logIn",
    async ( data )=>{
        const { authenticate } = data;
        return await authenticate({signingMessage:'Benvenuto in chesssboard.io'})
            .then(user=>{
                return {id:user.id, ads:user.get('ethAddress'), message:{}}
            });
    }
)
export const logOut = createAsyncThunk(
    'menu/logOut',
    async(data) =>{
        const { logout } = data;
        return await logout()
            .then(()=>{return {id:'', ads:'', message:{status:'logout', error:''}}});
    }
)
export const joinGameWF = createAsyncThunk(
    "menu/joinGameWF",
    async(data) => {
        console.log(data)
        const unfdGames = new Moralis.Query("Games");
        const unfdGamesQuery = await unfdGames
                                .equalTo('status','unfounded')
                                .equalTo('chessboard', data.chessboard)
        return await unfdGamesQuery.find()
            .then(async (games)=>{
                console.log(games)
                if(games.length>0){
                    await Moralis.Cloud.run('updateFoundedGamesWF',{chessboard:data.chessboard})
                }
                return { enemy:games[0].get('player1'), chessboard:data.chessboard,quote:games[0].get('quote'), from:games[0].get('from'), to:games[0].get('to'), team:false  }
            })
    }
)

export const newGameWF = createAsyncThunk(
    "menu/newGameWF",
    async(data)=>{
        console.log(data)
        const Chessboard = new ethers.ContractFactory(ChessBoard.abi, ChessBoard.bytecode, signer);
        const chessboard = await Chessboard.deploy(store.getState().menu.user.ads, data.address);
        const quote = matchPrizes(data.from, data.to)

        const Game = Moralis.Object.extend("Games");
        const waiting_game = new Game();
        const game = waiting_game.save({
            status:'unfounded',
            player1: store.getState().menu.user.ads,
            turner: store.getState().menu.user.ads, 
            player2: String(data.address).toLowerCase(),
            chessboard:chessboard.address,
            quote:quote
        })
        return { enemy:data.address, chessboard:chessboard.address, quote:quote, team:true, from:data.from, to:data.to }
    }
)


export const newGame = createAsyncThunk(
    "menu/newGame",
    async ( data )=>{
        //GESTIRE IL MATCHMAKING!!!
        console.log('Invio richiesta al server')
        const fetchWUser = new Moralis.Query("Games")
        const fetchWUserQuery = await fetchWUser
                                .equalTo("status","unfounded")
                                .greaterThan("quote", Number(data.from))
                                .lessThan("quote", Number(data.to))
        console.log(fetchWUserQuery)

        return await fetchWUserQuery.find()
            .then( 
                async (games)=>{
                    //INSERIRE CRITERIO PER SCELTA SFIDANTE
                    if(games.length > 0) {//CAMBIARE IF
                        const Game = games[0];

                        //deploy the smart contract 
                        console.log('Player 1: ',store.getState().menu.user.ads)
                        console.log('Player 2: ',Game.get('player2'))
                        console.log('deployo la partita....')

                        const Chessboard = new ethers.ContractFactory(ChessBoard.abi, ChessBoard.bytecode, signer);
                        const chessboard = await Chessboard.deploy(store.getState().menu.user.ads, Game.get('player2'))
                        
                        //AGGIORNA GAMES A FOUNDED
                        const res = await Moralis.Cloud.run('updateFoundedGames', { player2:Game.get('player2'), quote:Game.get('quote'), player1:store.getState().menu.user.ads, chessboard:chessboard.address })
                        console.log('----------------------------------------')
                        console.log(res);

                        return { chessboard:chessboard.address, enemy:Game.get('player2'), from:data.from, to:data.to, quote:Game.get('quote'), team:true }
                    } else if(games.length==0) {//CAMBIARE IF
                        //mi metto in coda 
                        console.log('mi metto in fila...')
                        const Game = Moralis.Object.extend("Games");
                        const waiting_game = new Game();
                        const quote = matchPrizes(data.from, data.to)

                        const game = await waiting_game.save({
                            status:'unfounded', 
                            player2: store.getState().menu.user.ads,
                            quote: quote,
                        });   

                        return { chessboard:'', enemy:'', from:data.from, to:data.to, quote:quote,team:false }
                    }
                }
            )
    }
)
