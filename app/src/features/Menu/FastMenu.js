import React, { useState, useEffect }  from 'react';
import { store } from './../../app/store';
import { ethers, provider, signer } from '../../App';
import MatchMaking from './LoadingPanel/MatchMaking';
import PreMatchMaking from './LoadingPanel/PreMatchMaking';
import Moralis from 'moralis';
import ChessBoard from '../../artifacts/ChessBoard';
import { gameFound } from './menuSlice';
import { foundMyEnemy, foundMyGame } from '../../fun/matchmaking';
import { payedGame } from './menuSlice'

export default function FastMenu() {
  
  useEffect(() =>{
    if(store.getState().menu.matchmaking.message.status=='letsplaytg'){
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
    }
  })

  store.subscribe( async ()=>{
    if(store.getState().menu.matchmaking.message.status=='pending'){
      console.log('matchmaking avviato...');
      setDisplayMMPanel('block');
    }
    else if(store.getState().menu.matchmaking.message.status=='letsplaytg'){
      console.log("ci siamo entrambi");
      //FAI PAGARE LE PERSONE
      console.log(store.getState())
      setDisplayPMMPanel('hidden');  
    }
    else if(store.getState().menu.matchmaking.message.status=='foundaplayer'){
      console.log("found a player pls");
      setDisplayPMMPanel('block');  
    }
    else if(store.getState().menu.matchmaking.message.status=='letsplay'){
      console.log('matchmaking completato aspetto laltro si connetta...');
      const founded = foundMyEnemy();
      setDisplayMMPanel(' ');  
    }
    else if(store.getState().menu.matchmaking.message.status=='waiting'){
      console.log('matchmaking completato sono in lista...');
      const founded = foundMyGame();
      setDisplayMMPanel(' ');  
    }
    else if(store.getState().menu.matchmaking.message.status=='payed'){
      setDisplayMMPanel('hidden');  
    }
    else if(store.getState().menu.matchmaking.message.status=='rejected'){
      console.log('matchmaking annullato...');    
      setDisplayMMPanel('hidden');  
    }
  });

  const [displayMMPanel, setDisplayMMPanel] = useState('hidden');
  const [displayPMMPanel, setDisplayPMMPanel] = useState('block');
  
  return (
    <div className="FastMenu w-1/3 bg-amber-600 inline-block rounded">
      <div
        id="LoadingMatchMaking" 
        className={"LoadingMatchMaking py-4 z-3 text-center bg-rose-200 opacity-80 "+displayMMPanel}>
        <MatchMaking />
      </div>
      <div className="Status-Row p-1">
        <span className="Status font-semibold text-white">status:<div className="Stats inline-block">{store.getState().menu.matchmaking.message.status}</div></span>
        <div className="Status-Btn">{}</div>
      </div>
      <div className={"PreMatchMaking "+displayPMMPanel}>
       <PreMatchMaking />
      </div>
    </div>
  );
}