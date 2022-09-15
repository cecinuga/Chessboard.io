import { store } from '../app/store';
import { ethers, provider, signer } from '../App';
import Moralis from 'moralis';
import { formatAddress, formatPrice } from './formatter';
import { EnemyMove } from '../features/Chessboard/chessSlice';
import pawn_black from "../public/pieces/pawn-black.png";
import knight_black from "../public/pieces/knight-black.png";
import rook_black from "../public/pieces/rook-black.png";
import bishop_black from "../public/pieces/bishop-black.png";
import queen_black from "../public/pieces/queen-black.png";
import king_black from "../public/pieces/king-black.png";
import pawn_white from "../public/pieces/pawn-white.png";
import knight_white from "../public/pieces/knight-white.png";
import rook_white from "../public/pieces/rook-white.png";
import bishop_white from "../public/pieces/bishop-white.png";
import queen_white from "../public/pieces/queen-white.png";
import king_white from "../public/pieces/king-white.png";
import empty from "../public/pieces/empty.png";


export const changeTurnerListener = () => {
    const time = setTimeout(async ()=>{
        console.log('sto aspettando che il mio avversario muova.')
        const fetchGame = new Moralis.Query("Games");
        fetchGame
            .equalTo('chessboard', store.getState().menu.matchmaking.chessboard)
            .equalTo('turner', String(store.getState().menu.user.ads))
        const games = await fetchGame.find();
        
        console.log(games)
        console.log(store.getState().menu.user.ads)
        console.log(store.getState().menu.matchmaking.chessboard)
        if(games.length>0){
            console.log('lastFirstStep: '+games[0].get('lastFirstStep'))
            console.log('lastSecondStep: '+games[0].get('lastSecondStep'))
            
            store.dispatch(EnemyMove({firstStep:games[0].get('lastFirstStep'), secondStep:games[0].get('lastSecondStep'), piece:games[0].get('piece'), piece2:games[0].get('piece2'), team:!store.getState().menu.matchmaking.team}))
            return true;
        } else { changeTurnerListener() }
    },2000);
    console.log(time)
    return time
}

export const getPieceImg = (piece, color) => {
    let p;
    if(color==' text-white'){
        if(piece=='p') p=pawn_white;
        if(piece=='c') p=knight_white;
        if(piece=='a') p=bishop_white;
        if(piece=='t') p=rook_white;
        if(piece=='q') p=queen_white;
        if(piece=='k') p=king_white;
        if(piece==''||piece==undefined||piece==null) p=empty
    }else if(color==' text-black'){
        if(piece=='p') p=pawn_black;
        if(piece=='c') p=knight_black;
        if(piece=='a') p=bishop_black;
        if(piece=='t') p=rook_black;
        if(piece=='q') p=queen_black;
        if(piece=='k') p=king_black;
        if(piece==''||piece==undefined||piece==null) p=empty

    } else { p='' }
    return p;
}