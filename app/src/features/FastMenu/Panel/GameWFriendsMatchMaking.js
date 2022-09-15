import React, {useState, useEffect} from 'react';
import { store } from '../../../app/store';
import { authPrice, authAddress } from '../../../fun/matchmaking'
import { newGameWF } from '../../Menu/menuAPI'
export default function GameWFriendsMatchMaking(){
    
    return (
        <div className="GameWFriendsMatch p-2 mb-2 bg-zinc-500 rounded-md">
            <div className="text-white text-2xl font-bold">New Game with Friend</div>
            <div className="text-white font-bold">
                <label
                    htmlFor="Prize-from-friends"
                    className="mr-2 text-lg">From:</label>
                <input 
                    id="Prize-from-friends"
                    className="inline-block w-14 rounded text-black p-1 mr-2"
                    type="text"/>
                <label
                    htmlFor="Prize-to-friends"
                    className="mr-2 text-lg">To:</label>
                <input 
                    id="Prize-to-friends"
                    className="inline-block w-14 rounded text-black p-1 mr-2"
                    type="text"/>
            </div>
            <div>
                <input
                    className='JoinMatchMaking-Input p-2 mr-1 rounded text-amber-600 font-bold placeholder:text-amber-500 placeholder:font-bold'
                    type="text"
                    id="Address-friends"
                    placeholder="Friend Address"
                    defaultValue="0xcf70e93b75BC5D94652445282DeC2DdaB223Aac1"
                />
                <button 
                    onClick={()=>{if(authPrice(document.getElementById('Prize-from-friends').value)&&authPrice(document.getElementById('Prize-to-friends').value), authAddress(document.getElementById('Address-friends').value)){
                        store.dispatch(newGameWF({from:document.getElementById('Prize-from-friends').value, to:document.getElementById('Prize-to-friends').value, address:document.getElementById('Address-friends').value}))
                    }}}
                    className="hover:bg-green-700 bg-green-600 border-2 border-solid hover:border-green-600 border-green-800 p-1 mt-2 text-lg text-white font-bold rounded inline-block"
                    >Start!
                </button>
            </div>
        </div>
    )
}