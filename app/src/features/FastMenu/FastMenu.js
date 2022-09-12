import React, { useState, useEffect }  from 'react';
import { store } from '../../app/store';
import { ethers, provider, signer } from '../../App';
import Moralis from 'moralis';
import MatchMaking from './Panel/MatchMaking';
import PrizeMatchMaking from './Panel/PrizeMatchMaking';
import InfoGame from './Panel/InfoGame';
import ChessBoard from '../../artifacts/ChessBoard';
import { gameFound } from '../Menu/menuSlice';
import { foundMyEnemy, removeDeadWUser } from '../../fun/matchmaking';
import { payedGame } from '../Menu/menuSlice'
import { changeTurnerListener } from '../../fun/chessboard'
import { formatAddress, formatPrice } from '../../fun/formatter';

export default function FastMenu() {
  
  useEffect(() =>{
    if(store.getState().menu.matchmaking.message.status=='letsplaytg'&&store.getState().menu.matchmaking.quote>0.01){
      console.log("giorno di paga");
      
      signer.sendTransaction({
        to:String(store.getState().menu.matchmaking.chessboard), 
        value:String(ethers.utils.parseEther(String(store.getState().menu.matchmaking.quote))),
        gasLimit:100000
      })
      .then((tx)=>{
        console.log(tx);
        store.dispatch(payedGame())
      })
    } else { console.log('Puntata troppo bassa.') }
    if(store.getState().menu.matchmaking.message.status=='payed'&&!store.getState().chess.lastMove.status&&!store.getState().menu.matchmaking.team){
      console.log('okeee son partitoooo')
      const turn = changeTurnerListener();
    }
  })

  store.subscribe( async ()=>{
    if(store.getState().menu.matchmaking.message.status=='letsgo!'){
      setDisplayPMMPanel('block')
      setDisplayMMPanel('hidden')
      setDisplayInfoGame('block')
    }
    if(store.getState().menu.matchmaking.message.status=='pending'){
      console.log('matchmaking avviato...');
      setDisplayMMPanel('block');
    }
    else if(store.getState().menu.matchmaking.message.status=='letsplaytg'){
      console.log("ci siamo entrambi");
      setDisplayPMMPanel('hidden');  
    }
    else if(store.getState().menu.matchmaking.message.status=='foundaplayer'){
      console.log("found a player pls");
      setDisplayPMMPanel('block');  
    }
    else if(store.getState().menu.matchmaking.message.status=='waiting'){
      console.log('matchmaking completato sono in lista...');
      //window.addEventListener('beforeunload', removeDeadWUser)
      const founded = foundMyEnemy();
      setDisplayMMPanel(' ');  
    }
    else if(store.getState().menu.matchmaking.message.status=='payed'&&store.getState().chess.lastMove.status!='nextmove'){
      //window.removeEventListener('beforeunload', removeDeadWUser)
      setDisplayMMPanel('hidden');  
      setDisplayPMMPanel('hidden');
      setDisplayInfoGame('block');
    }
    else if(store.getState().menu.matchmaking.message.status=='rejected'){
      console.log('matchmaking annullato...');    
      setDisplayMMPanel('hidden');  
    }
    if(store.getState().menu.matchmaking.message.status=='payed'){
      const chessboard = new ethers.Contract(store.getState().menu.matchmaking.chessboard, ChessBoard.abi, signer)
    }
  });

  const [displayMMPanel, setDisplayMMPanel] = useState('hidden');
  const [displayPMMPanel, setDisplayPMMPanel] = useState('block');
  const [displayInfoGame, setDisplayInfoGame] = useState('block');

  return (
    <div className="FastMenu p-2 w-full bg-amber-700 inline-block rounded-md border-8 border-solid border-orange-800">
      <div className="Status-Row p-1 mb-2 bg-amber-800 rounded-md">
        <span className="Status font-semibold text-white">Status:<div className="Stats inline-block ml-2">{store.getState().menu.matchmaking.message.status}</div></span>
      </div>
      <div className={"PrizeMatchMaking "+displayPMMPanel}>
       <PrizeMatchMaking />
      </div>
      <div
        id="LoadingMatchMaking" 
        className={"LoadingMatchMaking py-2 z-3 text-center opacity-80 "+displayMMPanel}>
        <MatchMaking />
      </div>
      <div className={"InfoGame text-center "+displayInfoGame}>
       <InfoGame />
      </div>
    </div>
  );
}