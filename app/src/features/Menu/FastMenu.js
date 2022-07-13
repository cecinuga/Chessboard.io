import React, { useState, useEffect }  from 'react';
import { store } from './../../app/store';
import { ethers, provider, signer } from '../../App';
import MatchMaking from './LoadingPanel/MatchMaking';
import Moralis from 'moralis';
import ChessBoard from '../../artifacts/ChessBoard'
import { gameFound } from './menuSlice'
import cloudGames from '../../cloud/cloudGames'

export default function FastMenu() {
  const [displayMMPanel, setDisplayMMPanel] = useState('hidden');
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
            if(game.get('player2')==await signer.getAddress()){
                //CAMBIA LO STATUS DA UNFOUNDED A FOUNDED NEL DB
                const chessboardUpdate = [
                  { filter: { player2: await signer.getAddress(), chessboard: store.getState().menu.matchmaking.chessboard }, update: { status:'found' } }
                ];
                
                store.dispatch(gameFound({player1:game.get('player1'), chessboard:game.get('chessboard')}))
                setDisplayMMPanel('hidden')
              }
        })
      } else { foundMyGame() }
    },2000);
    return time
  }
  const foundMyEnemy = () => {
    const time = setTimeout(async ()=>{
      console.log('sto aspettando eh...')
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
                store.dispatch(gameFound({player1:game.get('player1'), chessboard:game.get('chessboard')}))
                setDisplayMMPanel('hidden')
              }
        })
      } else { foundMyGame() }
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
    else if(store.getState().menu.matchmaking.message.status=='letsplay'){
      console.log('matchmaking completato aspetto laltro si connetta...');
      setDisplayMMPanel(' ');  
    }
    else if(store.getState().menu.matchmaking.message.status=='letsplaytg'){
      console.log("ci siamo entrambi");
      setDisplayMMPanel('hidden');  
    }
    else if(store.getState().menu.matchmaking.message.status=='waiting'){
      console.log('matchmaking completato sono in lista...');
      setDisplayMMPanel(' ');  
    }
    else if(store.getState().menu.matchmaking.message.status=='rejected'){
      console.log('matchmaking annullato...');    
      setDisplayMMPanel('hidden');  
    }
  });
  
  return (
    <div className="FastMenu w-1/3 bg-amber-200 inline-block rounded">
      <div
        id="LoadingMatchMaking" 
        className={"LoadingMatchMaking py-4 z-3 text-center bg-rose-200 opacity-80 "+displayMMPanel}>
        <MatchMaking />
      </div>
      <div className="Status-Row">
        <span className="Status">status:{store.getState().menu.matchmaking.message.status}</span>
        <div className="Status-Btn">{}</div>
      </div>
    </div>
  );
}