import React, { Component, useState }  from 'react';
import PiecePanel from './PiecePanel';
import Point from './Point';
import { store } from '../../../../app/store';
import pawn_black from "../../../../public/pieces/pawn-black.png";
import knight_black from "../../../../public/pieces/knight-black.png";
import rook_black from "../../../../public/pieces/rook-black.png";
import bishop_black from "../../../../public/pieces/bishop-black.png";
import queen_black from "../../../../public/pieces/queen-black.png";
import king_black from "../../../../public/pieces/king-black.png";
import pawn_white from "../../../../public/pieces/pawn-white.png";
import knight_white from "../../../../public/pieces/knight-white.png";
import rook_white from "../../../../public/pieces/rook-white.png";
import bishop_white from "../../../../public/pieces/bishop-white.png";
import queen_white from "../../../../public/pieces/queen-white.png";
import king_white from "../../../../public/pieces/king-white.png";

export function Graveyard(team){
    let pieces;
    let i = 0;
    let className;let background;let background_piece;let border;let border2;let pawn;let bishop;let rook;let queen;let king;let knight;
    if(team.color){ className="InfoGame-Graveyards-White";background=" bg-white ";border=" border-black ";border2=" border-white ";pawn=pawn_white;bishop=bishop_white;knight=knight_white;rook=rook_white;queen=queen_white;king=king_white; }
    else{className="InfoGame-Graveyards-Black";background=" bg-black ";background_piece=" bg-white ";border=" border-white ";border2=" border-black ";pawn=pawn_black;bishop=bishop_black;knight=knight_black;rook=rook_black;queen=queen_black;king=king_black;}
    
    pieces = {'p':pawn,'t':rook,'a':bishop,'q':queen, 'k':king, 'c':knight}

    const [Graveyard, setGraveyard] = useState([]);
    store.subscribe(async()=>{
        if(store.getState().chess.lastMove.status=='enemynextmove'&&team.color==store.getState().menu.matchmaking.team){
            console.log('AGGIORNO IL MIO CIMITERO!!')
            setGraveyard(store.getState().chess.graveyard.my)
            console.log(Graveyard);
        }
        else if(store.getState().chess.lastMove.status=='nextmove'&&team.color!=store.getState().menu.matchmaking.team){
            console.log('AGGIORNO CIMITERO AVVERSARIO!!')
            setGraveyard(store.getState().chess.graveyard.enemy)
            console.log(Graveyard);
        }
    });
    
    return(
            <div className={className+" mb-2"}>
                <div className={border2+"border-2 border-solid relative text-left p-4 rounded-lg w-3/12 inline-block"}>
                    <Point color={team.color}/>
                </div>
                <div className="w-1/12 inline-block"></div>
                <div className={border2+"border-2 border-solid relative top-2 rounded-lg p-1 w-8/12 inline-block"}>
                    <div className="text-left">
                        <div className={className+"-grave"}>
                            <div className="text-center">
                                {
                                    Graveyard.map((piece)=>{
                                        i++;
                                        return (<PiecePanel key={i} id={i} team={team.color} piece={pieces[piece]} label={piece} /> )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}