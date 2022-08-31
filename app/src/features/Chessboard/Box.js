import React, { Component, useState, useEffect } from 'react';
import { store } from '../../app/store';
import { Move } from './chessAPI';
import ChessBoard from '../../artifacts/ChessBoard.json'; 
import Web3 from 'web3';
import { ethers, signer } from '../../App';
import { changeTurnerListener } from '../../fun/chessboard'
import { formatAddress, formatPrice } from '../../fun/formatter';
import { EnemyMove } from './chessSlice';


export default function Box(props){
    const [Checked, setChecked] = useState(false);
    const [Piece, setPiece] = useState(props.p);
    const [PieceColor, setPieceColor] = useState(props.color);
    const [Rotate, setRotate] = useState('');

    store.subscribe(async()=>{
        if(store.getState().menu.matchmaking.message.status=='payed'&&store.getState().chess.lastMove.status!='nextmove'&&!store.getState().menu.matchmaking.team){
            setRotate(' rotate-180');
        }
        if(store.getState().chess.lastMove.status=="nextmove"&&store.getState().chess.lastMove.firstStep==props.coo){
            setChecked(false);
            setPiece('');
        }
        if(store.getState().chess.lastMove.status=='enemynextmove'&&store.getState().chess.lastMove.firstStep==props.coo){
            setPiece('');
        }
        if(store.getState().chess.lastMove.status=='enemynextmove'&&store.getState().chess.lastMove.secondStep==props.coo){
            setPiece(store.getState().chess.lastMove.piece);
            if(store.getState().menu.matchmaking.team){ setPieceColor(' text-black'); }
            else{ setPieceColor(' text-white'); }
            
            
            const chessboard = new ethers.Contract(store.getState().menu.matchmaking.chessboard/*chessboard_address*/, ChessBoard.abi, signer)
            if(chessboard.winner==store.getState().menu.matchmaking.enemy){
                //HAI PERSO.
            } 
        }
        if(store.getState().chess.lastMove.status=='nextmove'&&store.getState().chess.lastMove.secondStep==props.coo){
            console.log('CHANGETURNERLISTENER')          
            setChecked(false);
            setPiece(store.getState().chess.lastMove.piece);
            
            if(store.getState().menu.matchmaking.team){ setPieceColor(' text-white'); }
            else{ setPieceColor(' text-black'); }

            console.log(store.getState().chess)
            /*
            const chessboard = new ethers.Contract(store.getState().menu.matchmaking.chessboard, ChessBoard.abi, signer)
            if(chessboard.winner==store.getState().menu.user.ads){
                //HAI VINTO.
            } else{
                const turn = changeTurnerListener();
                console.log('turn: '+turn)
            }  */
           
        }
        if(store.getState().chess.lastMove.status=='repeat'){setChecked(false);}
    });
    useEffect(()=>{
        if(store.getState().chess.lastMove.status=='nextmove'&&store.getState().chess.lastMove.secondStep==props.coo){
            const chessboard = new ethers.Contract(store.getState().menu.matchmaking.chessboard/*chessboard_address*/, ChessBoard.abi, signer)
            if(chessboard.winner==store.getState().menu.user.ads){
                //HAI VINTO.
            } else{
                const turn = changeTurnerListener();
                console.log('turn: '+turn)
            }  
           
        }
    });

    return(
        <div 
            id={props.id}
            className={'Box bg-red-800 text-center'+PieceColor+Rotate}> 
                <input 
                    type="checkbox"
                    id={"Box-"+String(props.coo)} 
                    value={Piece}
                    checked={Checked}
                    className="Boxes xl:w-20 w-10 xl:h-20 h-10"
                    onChange={
                        async ()=>{//PASSARE DESTRUTTURANDO LA FUNZIONE RUN CONTRACT MORALIS PER CHESSSLICE.JS
                            setChecked(true)
                            store.dispatch(Move({ step:props.coo, piece:Piece}))
                        }
                    }
                /> 
                <span id={"Box-p-"+String(props.coo)}>{Piece}</span>
        </div>
    );
}
