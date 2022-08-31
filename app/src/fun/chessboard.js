import { store } from '../app/store';
import { ethers, provider, signer } from '../App';
import Moralis from 'moralis';
import { formatAddress, formatPrice } from './formatter';
import { EnemyMove } from '../features/Chessboard/chessSlice';

export const changeTurnerListener = () => {
    const time = setTimeout(async ()=>{
        console.log('sto aspettando che il mio avversario muova.')
        const fetchGame = new Moralis.Query("Games");
        fetchGame
            .equalTo('turner', await signer.getAddress())
            .equalTo('chessboard', store.getState().menu.matchmaking.chessboard)
        const games = await fetchGame.find();
        console.log(games)
        if(games.length>0){
            console.log('lastFirstStep: '+games[0].get('lastFirstStep'))
            console.log('lastSecondStep: '+games[0].get('lastSecondStep'))

            let className;
            if(store.getState().menu.matchmaking.team){ className = 'text-black' }
            else if(!store.getState().menu.matchmaking.team){ className = 'text-white' }
            
            /*document.getElementById('Box-p-'+games[0].get('lastSecondStep')).innerHTML = document.getElementById('Box-'+games[0].get('lastFirstStep')).value;
            document.getElementById('Box-'+games[0].get('lastSecondStep')).value = document.getElementById('Box-'+games[0].get('lastFirstStep')).value;
            document.getElementById('Box-p-'+games[0].get('lastFirstStep')).innerHTML = '';
            document.getElementById('Box-'+games[0].get('lastFirstStep')).value = '';
            document.getElementById('Box-p-'+games[0].get('lastSecondStep')).className = className
            document.getElementById('InfoGame-Turner-value').innerHTML=formatAddress(store.getState().menu.user.ads);
            */
            console.log(document.getElementById('Box-'+games[0].get('lastFirstStep')).value)
            //INSERIRE IL PEZZO CHE SI SPOSTA ALL'INTERNO DEL DB!!!!!!!!!!!!
            store.dispatch(EnemyMove({firstStep:games[0].get('lastFirstStep'), secondStep:games[0].get('lastSecondStep'), piece:games[0].get('piece'), piece2:games[0].get('piece2')}))
            return true;
        } else { changeTurnerListener() }
    },2000);
    console.log(time)
    return time
}