import React, { Component }  from 'react';
import PiecePanel from './PiecePanel';
import { store } from '../../../app/store';
import pawn_black from "../../../public/pieces/pawn-black.png";
import knight_black from "../../../public/pieces/knight-black.png";
import rook_black from "../../../public/pieces/rook-black.png";
import bishop_black from "../../../public/pieces/bishop-black.png";
import queen_black from "../../../public/pieces/queen-black.png";
import king_black from "../../../public/pieces/king-black.png";
import pawn_white from "../../../public/pieces/pawn-white.png";
import knight_white from "../../../public/pieces/knight-white.png";
import rook_white from "../../../public/pieces/rook-white.png";
import bishop_white from "../../../public/pieces/bishop-white.png";
import queen_white from "../../../public/pieces/queen-white.png";
import king_white from "../../../public/pieces/king-white.png";

export function Graveyard(team){
    let pieces = new Array();
    let className;let background;let background_piece;let border;let border2;let pawn;let bishop;let rook;let queen;let king;let knight;
    if(team.color){ className="InfoGame-Graveyards-White";background=" bg-white ";border=" border-black ";border2=" border-white ";pawn=pawn_white;bishop=bishop_white;knight=knight_white;rook=rook_white;queen=queen_white;king=king_white; }
    else{className="InfoGame-Graveyards-Black";background=" bg-black ";background_piece=" bg-white ";border=" border-white ";border2=" border-black ";pawn=pawn_black;bishop=bishop_black;knight=knight_black;rook=rook_black;queen=queen_black;king=king_black;}
    
    pieces[0] = {piece: pawn, l:'p'};
    pieces[1] = {piece: pawn, l:'p'};
    pieces[2] = {piece: pawn, l:'p'};
    pieces[3] = {piece: pawn, l:'p'};
    pieces[4] = {piece: pawn, l:'p'};
    pieces[5] = {piece: pawn, l:'p'};
    pieces[6] = {piece: pawn, l:'p'};
    pieces[7] = {piece: pawn, l:'p'};
    pieces[8] = {piece: bishop, l:'b'};
    pieces[9] = {piece: bishop, l:'b'};;
    pieces[10] = {piece: knight, l:'k'};
    pieces[11] = {piece: knight, l:'k'};
    pieces[12] = {piece:rook, l:'k'};
    pieces[13] = {piece:rook, l:'k'};
    pieces[14] = {piece:queen, l:'q'};
    pieces[15] = {piece:king, q:'k'};
    let i=0;
    
    return(
            <div className={className+" mb-2"}>
                <div className={border2+"border-2 border-solid relative text-left p-4 rounded-lg w-3/12 inline-block"}>
                    <div className="text-left">
                        <div className={className+"rounded-full w-6 h-6 border-2 border-solid inline-block relative rounded-full top-1"+border+background}></div>
                        <div className={className+"-point ml-1 inline-block mr-1 "}>{store.getState().chess.points.black}</div>
                        <div className={className+"-grave inline-block"}></div>
                    </div>
                </div>
                <div className="w-1/12 inline-block"></div>
                <div className={border2+"border-2 border-solid relative top-2 rounded-lg p-1 w-8/12 inline-block"}>
                    <div className="text-left">
                        <div className={className+"-grave"}>
                            <div className="text-center">
                                {pieces.map((p)=>{
                                    i++;
                                    return <PiecePanel key={i} id={i} team={team.color} piece={p.piece} label={p.l}/> 
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}