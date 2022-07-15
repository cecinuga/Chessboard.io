import React, { useState, useEffect }  from 'react';
import { store } from './../../app/store';
import { ethers, provider, signer } from '../../App';
import MatchMaking from './LoadingPanel/MatchMaking';
import PreMatchMaking from './LoadingPanel/PreMatchMaking';
import Moralis from 'moralis';
import ChessBoard from '../../artifacts/ChessBoard'
import { gameFound } from './menuSlice'

export default function FastMenu() {
  const foundMyGame = () => {
    const time = setTimeout(async ()=>{
      console.log('sto aspettando eh...')
      let chessboard_address='';
      let enemy_address='';
      
      const fetchGame = new Moralis.Query("Games");
      fetchGame.equalTo('player2', await signer.getAddress());
      fetchGame.equalTo('status', 'unfounded')
      const games = await fetchGame.find();
      
      console.log(games);    
      if(games.length>0){
        return games.map(async (game)=>{ 
            console.log(game)
            if(game.get('player2')==await signer.getAddress()){
              //game.set("status","founded")  
              Moralis.Cloud.run(
                  'updateStatusGames',
                  { player2:await signer.getAddress() }
                )
                .then((res)=>{
                  console.log(res)
                })
              Moralis.Cloud.run(
                  'removeWUser',
                  { address:await signer.getAddress() }
                )
                .then((res)=>{
                  console.log(res);
                  store.dispatch(gameFound({player:game.get('player1'), chessboard:game.get('chessboard')}))
                })
              }
        })
      } else { foundMyGame() }
    },2000);
    return time
  }
  const foundMyEnemy = () => {
    const time = setTimeout(async ()=>{
      console.log('sto aspettando che il mio nemico prenda parte   eh...')
      let chessboard_address='';
      let enemy_address='';
      
      const fetchGame = new Moralis.Query("Games");
      fetchGame.equalTo('player1', await signer.getAddress());
      fetchGame.equalTo('status', 'founded')
      const games = await fetchGame.find();
  
      console.log(games);
      
      if(games.length>0){
        return games.map(async (game)=>{ 
            if(game.get('player1')==await signer.getAddress()){
                store.dispatch(gameFound({player:game.get('player2'), chessboard:game.get('chessboard')}))
              }
        })
      } else { foundMyEnemy() }
    },2000);
    return time
  }
  useEffect(() =>{
    if(store.getState().menu.matchmaking.message.status=='waiting'){
      const mygame = foundMyGame();
      
    }
    if(store.getState().menu.matchmaking.message.status=='letsplay'){
      const mygame = foundMyEnemy();
    }
  })

  store.subscribe( async ()=>{
    if(store.getState().menu.matchmaking.message.status=='pending'){
      console.log('matchmaking avviato...');
      setDisplayMMPanel('block');
    }
    else if(store.getState().menu.matchmaking.message.status=='letsplaytg'){
      console.log("ci siamo entrambi");
      setDisplayMMPanel('hidden');  
    }
    else if(store.getState().menu.matchmaking.message.status=='foundaplayer'){
      console.log("found a player pls");
      setDisplayPMMPanel(' ');  
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