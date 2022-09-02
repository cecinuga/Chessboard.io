import React, { Component, useState } from 'react';
import { store } from '../../../../app/store';
import xmark from "../../../../public/pieces/xmark-solid.png";

export default function PiecePanel(props){
    let background_piece;
    if(props.team){background_piece=" bg-black ";}
    else{background_piece=" bg-white ";}
    
    const [ Hidden, setHidden ] = useState(' hidden');

    return(
        <div 
            id={"Piece-"+props.id}
            className={"Piece-"+props.id+" relative w-fit inline-block"}>
            <img className={"w-7 h-7 p-1 border border-solid border-orange-600 inline-block rounded-full"+background_piece} src={props.piece} />
        </div>
    );
}