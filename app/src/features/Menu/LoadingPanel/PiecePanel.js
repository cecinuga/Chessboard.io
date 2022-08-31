import React, { Component } from 'react';
import xmark from "../../../public/pieces/xmark-solid.png";

export default function PiecePanel(props){
    let background_piece;
    if(props.team){background_piece=" bg-black ";}
    else{background_piece=" bg-white ";}
    return(
        <div 
            id={"Piece-"+props.id}
            className={"Piece-"+props.id+" relative w-fit inline-block"}>
            <img className={"w-7 h-7 p-1 border border-solid border-orange-600 inline-block rounded-full"+background_piece} src={props.piece} />
            <img 
                id={"Piece-img-"+props.id}
                className={"Piece-img inline-block w-6 h-7 absolute left-0 hidden"} src={xmark} />
            <input id={"Piece-value-"+props.id} value={props.l} className="Piece-value hidden"/>
        </div>
    );
}