import { store } from '../app/store';
import { ethers, provider, signer } from '../App';
import Moralis from 'moralis';
import { gameFound } from '../features/Menu/menuSlice'

export const foundMyGame = () => {
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
export const foundMyEnemy = () => {
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
export const matchPrizes = (from, to) => { return Math.random() * (to - from) + from; }