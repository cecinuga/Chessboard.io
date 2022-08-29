import React, { Component }  from 'react';
import { store } from '../../../app/store';
import pawn from "../../../public/pieces/pawn.svg";
import knight from "../../../public/pieces/knight.svg";
import rook from "../../../public/pieces/rook.svg";
import bishop from "../../../public/pieces/bishop.svg";
import queen from "../../../public/pieces/queen.svg";
import king from "../../../public/pieces/king.svg";


export function Graveyard(team){
    let className;let background;let border;let border2;
    if(team.color){ className="InfoGame-Graveyards-White";background=" bg-white ";border=" border-black ";border2=" border-white "; }
    else{className="InfoGame-Graveyards-Black";background=" bg-black ";border=" border-white ";border2=" border-black ";}
    return(
            <div className={className+" relative mt-2 border-2 border-solid mt-4 rounded p-2"+border2}>
                <div className={className+"rounded-full w-6 h-6 mr-1 border-2 border-solid inline-block relative rounded-full top-1 "+border+background}></div>
                <div className={className+"-label inline-block"}>Graveyard: </div>
                <div className={className+"-point inline-block ml-2"}>{store.getState().chess.points.black}</div>
                <div className={className+"-grave"}></div>
            </div>
    );
}