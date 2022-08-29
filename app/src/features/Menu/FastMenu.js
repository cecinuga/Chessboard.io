import React, { useState, useEffect }  from 'react';
import { store } from './../../app/store';
import { ethers, provider, signer } from '../../App';
import Moralis from 'moralis';
import MatchMaking from './LoadingPanel/MatchMaking';
import PrizeMatchMaking from './LoadingPanel/PrizeMatchMaking';
import InfoGame from './LoadingPanel/InfoGame';
import ChessBoard from '../../artifacts/ChessBoard';
import { gameFound } from './menuSlice';
import { foundMyEnemy, foundMyGame } from '../../fun/matchmaking';
import { payedGame } from './menuSlice'
import { changeTurnerListener } from '../../fun/chessboard'
import { formatAddress, formatPrice } from '../../fun/formatter';

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
      setDisplayPMMPanel('hidden');
      setDisplayInfoGame('block');
      if(!store.getState().menu.matchmaking.team){
        document.getElementById('Chessboard').classList.add('rotate-180')
        const el = document.getElementsByClassName('Box')
        for(let i=0; i<el.length; i++){
          el.item(i).classList.add('rotate-180')
        }
        const turn = changeTurnerListener();
        document.getElementById('InfoGame-Turner-value').innerHTML=formatAddress(store.getState().menu.matchmaking.enemy);
      }else{
        document.getElementById('InfoGame-Turner-value').innerHTML=formatAddress(store.getState().menu.user.ads);
      }
    }
    else if(store.getState().menu.matchmaking.message.status=='rejected'){
      console.log('matchmaking annullato...');    
      setDisplayMMPanel('hidden');  
    }
  });

  const [displayMMPanel, setDisplayMMPanel] = useState('hidden');
  const [displayPMMPanel, setDisplayPMMPanel] = useState('block');
  const [displayInfoGame, setDisplayInfoGame] = useState('BLOCK');

  return (
    <div className="FastMenu p-2 w-full bg-amber-700 inline-block rounded-md">
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