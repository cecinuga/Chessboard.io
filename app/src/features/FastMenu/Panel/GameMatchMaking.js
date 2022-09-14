import React, { useState, useEffect }  from 'react';
import { store } from '../../../app/store';
import { newGame } from '../../Menu/menuAPI';
import { authPrice } from '../../../fun/matchmaking'

export default function GameMatchMaking(from, to){
    return(
        <div className="GameMatchMaking p-1 pb-2 mb-6 text-white font-semibold bg-amber-600 rounded text-center">
            <div className="text-white text-2xl font-bold">New Game</div>
            <div>
                <div className="mt-2 text-xl">Set Quote Range</div>
                <input 
                    id="Prize-from"
                    className="placeholder:font-bold inline-block w-14 rounded text-black p-1 mr-2"
                    placeholder="From"
                    type="text"/>
                <input 
                    id="Prize-to"
                    className="placeholder:font-bold inline-block w-14 rounded text-black p-1 mr-2"
                    placeholder="To"
                    type="text"/>
                
                <button 
                    onClick={()=>{if(authPrice(document.getElementById('Prize-from').value)&&authPrice(document.getElementById('Prize-to').value)){store.dispatch(newGame({from:from, to:to})).then(()=>{console.log(store.getState())})}}}
                    className="hover:bg-green-700 bg-green-600 border-2 border-solid hover:border-green-600 border-green-800 p-1 mt-2 text-lg text-white rounded inline-block"
                    >Start!
                </button>
            </div>
        </div>
    );
}