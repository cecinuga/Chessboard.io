import React, { useState, useEffect }  from 'react';
import { store } from '../../../app/store';
import { newGame } from '../../Menu/menuAPI';
import { authPrice } from '../../../fun/matchmaking'

export default function GameMatchMaking(){
    return(
        <div className="GameMatchMaking p-8 mb-6 text-black font-semibold bg-cover bg-center bg-[url('./public/versus_wallpaper.jpg')] rounded text-center">
            <div className="text-2xl font-bold"><span className="text-white">Set</span> Quote Range</div>
            <div>
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
                    onClick={()=>{if(authPrice(document.getElementById('Prize-from').value)&&authPrice(document.getElementById('Prize-to').value)){store.dispatch(newGame({from:document.getElementById('Prize-from').value.replace(/[^\x00-\x7F]/g, ""), to:document.getElementById('Prize-to').value.replace(/[^\x00-\x7F]/g, "")})).then(()=>{console.log(store.getState())})}}}
                    className="hover:bg-green-700 bg-green-600 border-2 border-solid hover:border-green-600 border-green-800 p-1 mt-2 text-lg text-white rounded inline-block"
                    >Start!
                </button>
            </div>
        </div>
    );
}