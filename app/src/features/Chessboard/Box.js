import React, { Component, useState, useEffect } from 'react';
import { store } from '../../app/store';
import { Move } from './chessAPI';
import ChessBoard from '../../artifacts/ChessBoard.json'; 
import Web3 from 'web3';
import { ethers, signer } from '../../App';
import { changeTurnerListener } from '../../fun/chessboard'
import { formatAddress, formatPrice } from '../../fun/formatter';
import { EnemyMove } from './chessSlice';
import { getPieceImg } from '../../fun/chessboard'

export default function Box(props){
    const [Selected, setSelected] = useState(false);
    const [Piece, setPiece] = useState(props.p);
    const [PieceColor, setPieceColor] = useState(props.color);
    const [Rotate, setRotate] = useState('');

    store.subscribe(async()=>{
        if(store.getState().chess.status=='notyturn'){
            setSelected(false);
        }
        if(store.getState().menu.matchmaking.message.status=='payed'&&store.getState().chess.lastMove.status!='nextmove'&&!store.getState().menu.matchmaking.team){
            setRotate(' rotate-180');
        }
        if(store.getState().chess.lastMove.status=="nextmove"&&store.getState().chess.lastMove.firstStep==props.coo){
            setSelected(false);
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
            setSelected(false);
            setPiece(store.getState().chess.lastMove.piece);
            
            if(store.getState().menu.matchmaking.team){ setPieceColor(' text-white'); }
            else{ setPieceColor(' text-black'); }

            console.log(store.getState().chess)
        }
        if(store.getState().chess.lastMove.status=='repeat'){setSelected(false);}
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
    let background;
    if((props.coo[0]%2!=0&&props.coo[1]%2!=0)||props.coo[0]%2==0&&props.coo[1]%2==0){ 
        if(Selected) background=' bg-yellow-200';
        else background=' bg-yellow-300'
    }
    if((props.coo[0]%2==0&&props.coo[1]%2!=0)||(props.coo[0]%2!=0&&props.coo[1]%2==0)){ 
        if(Selected) background=' bg-amber-700';
        else background=' bg-amber-900'
    }

    return(
        <div 
            id={props.id}
            className={'Box bg-red-800 text-center relative'+PieceColor+Rotate}> 
                <button 
                    onClick={
                        async ()=>{//PASSARE DESTRUTTURANDO LA FUNZIONE RUN CONTRACT MORALIS PER CHESSSLICE.JS
                            setSelected(true)
                            store.dispatch(Move({ step:props.coo, piece:Piece}))
                        }
                    }
                    className={"Box-bg  xl:w-20 w-10 xl:h-20 h-10"+background}>
                    <label htmlFor={"Box-"+String(props.coo)} className={"absolute left-0 top-0 w-full h-full"}>
                        <img
                            className={"Box-p-img relative w-8 h-8 xl:w-14 xl:h-14 left-1 top-1 xl:left-3 xl:top-3"} 
                            id={"Box-p-"+String(props.coo)}
                            src={getPieceImg(Piece, PieceColor)} 
                        />
                    </label>
                </button>
        </div>
    );
}
