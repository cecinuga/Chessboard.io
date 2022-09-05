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
    const [Winner, setWinner] = useState(props.winning);
    const [Rotate, setRotate] = useState('');

    store.subscribe(async()=>{
        if(store.getState().menu.matchmaking.message.status=='payed'&&store.getState().chess.lastMove.status!='nextmove'&&!store.getState().menu.matchmaking.team){
            setRotate(' rotate-180');
        }
        if(store.getState().chess.lastMove.status=='nextmove'){
            setSelected(false)
        }
    });
    useEffect(() =>{
        setPiece(props.p)
        setPieceColor(props.color)
        setWinner(props.winning)
    })

    let background;
    if((props.coo[0]%2!=0&&props.coo[1]%2!=0)||props.coo[0]%2==0&&props.coo[1]%2==0){ 
        if(Selected) background=' bg-yellow-200';
        else background=' bg-yellow-300'

        if(store.getState().menu.matchmaking.team&&Winner&&Piece=='k'&&!props.team) { background=' bg-red-600' }
        if(!store.getState().menu.matchmaking.team&&Winner&&Piece=='k'&&props.team) { background=' bg-red-600' }

        if(store.getState().menu.matchmaking.team&&!Winner&&Piece=='k'&&props.team&&store.getState().menu.matchmaking.message.status=='payed') { background=' bg-red-600' }
        if(!store.getState().menu.matchmaking.team&&!Winner&&Piece=='k'&&!props.team&&store.getState().menu.matchmaking.message.status=='payed') { background=' bg-red-600' }
    }
    if((props.coo[0]%2==0&&props.coo[1]%2!=0)||(props.coo[0]%2!=0&&props.coo[1]%2==0)){ 
        if(Selected) background=' bg-amber-700';
        else background=' bg-amber-900'  
    }

    return(
        <div 
            id={props.id}
            className={'Box bg-red-800 text-center relative inline-block'+PieceColor+Rotate}> 
                <button 
                    onClick={
                        async ()=>{
                            setSelected(true)
                            store.dispatch(Move({ step:props.coo, piece:Piece, team:store.getState().menu.matchmaking.team}))
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
