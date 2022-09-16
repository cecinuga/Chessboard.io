import { store } from '../app/store';
import { ethers, provider, signer } from '../App';
import Moralis from 'moralis';
import { gameFound, payedGame } from '../features/Menu/menuSlice'

export function authAddress(address){
  return {address:address, res:true};
}
export function authPrice(price){
  return {price:price, res:true};
}
export const removeDeadWGame = (event)=>{
  event.preventDefault()
  return event.returnValue = 'Are You Sure?'; 
  alert('ciaoooooooo')
} 
export const foundMyEnemyWF = (data)=>{
  const time = setTimeout(async ()=>{
    console.log('sto aspettando che il mio amico si colleghi')
    const fetchGame = new Moralis.Query("Games");
    fetchGame.equalTo('chessboard', store.getState().menu.matchmaking.chessboard);
    fetchGame.equalTo('status', 'founded');
    const games = await fetchGame.find();
    console.log(games)
    if(games.length>0){
      signer.sendTransaction({
        to:String(store.getState().menu.matchmaking.chessboard), 
        value:String(ethers.utils.parseEther(String(store.getState().menu.matchmaking.quote))),
        gasLimit:100000
      })
      .then((tx)=>{
        console.log(tx);
        store.dispatch(payedGame())
      })
    } else { foundMyEnemyWF(); }
  },2000)
}
export const foundMyEnemy = () => {
    const time = setTimeout(async ()=>{
      console.log('sto aspettando che il mio nemico prenda parte eh...')

      const fetchGame = new Moralis.Query("Games");
      fetchGame.equalTo('chessboard', store.getState().menu.matchmaking.chessboard);
      fetchGame.equalTo('status', 'founded')
      const games = await fetchGame.find();
  
      console.log(games);
      
      if(games.length>0){
        store.dispatch(gameFound({enemy:games[0].get('player1'), chessboard:games[0].get('chessboard')}))
      } else { foundMyEnemy() }
    },2000);
    return time
  }
export const matchPrizes = (from, to) => { return Math.random() * (Number(to) - Number(from)) + Number(from); }