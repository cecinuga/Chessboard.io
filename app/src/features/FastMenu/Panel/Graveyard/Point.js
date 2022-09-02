import React, { Componente, useState }  from 'react';
import { store } from '../../../../app/store';

export default function Point(team){
    let className;let background; let border;
    if(team.color){ className="InfoGame-Graveyards-White";background=" bg-white ";border=" border-black";}
    else{className="InfoGame-Graveyards-Black";background=" bg-black ";border=" border-white ";}
    
    return (
            <div className="Point text-left">
                <div className={className+"rounded-full w-6 h-6 border-2 border-solid inline-block relative rounded-full top-1"+border+background}></div>
                <div className={className+"-point ml-1 inline-block mr-1 "}>{
                    (team.color==store.getState().menu.matchmaking.team)?(
                        store.getState().chess.points.my
                    ):(store.getState().chess.points.enemy)
                }</div>
                <div className={className+"-grave inline-block"}></div>
            </div>
    );
}