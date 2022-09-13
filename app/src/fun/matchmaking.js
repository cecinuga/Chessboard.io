import { store } from '../app/store';
import { ethers, provider, signer } from '../App';
import Moralis from 'moralis';
import { gameFound } from '../features/Menu/menuSlice'

export function authData(from, to){
  return true;
}

export const removeDeadWUser = (event)=>{
  event.preventDefault()
  event.returnValue = 'Are You Sure?';
  Moralis.bulkUpdate("WRoom",[
    {filter:{address:store.getState().menu.user.ads}, update:{ status: 'dead'}}
  ])
  console.log('siiiiiiiiiiiiiiiiiiiii')
  
} 
export const foundMyEnemy = () => {
    const time = setTimeout(async ()=>{
      console.log('sto aspettando che il mio nemico prenda parte eh...')

      const fetchGame = new Moralis.Query("Games");
      fetchGame.equalTo('player2', store.getState().menu.user.ads);
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