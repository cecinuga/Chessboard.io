import { store } from '../app/store';
import { ethers, provider, signer } from '../App';
import Moralis from 'moralis';

export const changeTurnerListener = () => {
    const time = setTimeout(async ()=>{
        console.log('sto aspettando che il mio avversario muova.')
        const fetchGame = new Moralis.Query("Games");
        fetchGame
            .equalTo('turner', await signer.getAddress())
            .equalTo('chessboard', store.getState().menu.matchmaking.chessboard)
        const game = await fetchGame.find();
        console.log(game)
        if(game.length>0){

            return { firstStep: game.lastFirstStep, secondStep: game.lastSecondStep };
        } else { changeTurnerListener() }
    },2000);
    return time
}