import React, {useState, useEffect} from 'react';
import { store } from '../../../app/store';
import { authAddress } from '../../../fun/matchmaking';
import { joinGameWF } from '../../Menu/menuAPI'

export default function JoinWFriendsMatchMaking(){
    
     return (
        <div className="JoinMatchMaking bg-zinc-600 p-2 rounded-md">
            <div className="text-white text-2xl font-bold mb-2">Join Friend Game </div>
            <input
                className='JoinMatchMaking-Input p-2 rounded text-amber-600 font-bold placeholder:text-amber-500 placeholder:font-bold'
                type="text"
                placeholder="Chessboard Address"
                id="chessboard-address"
            />
            <button
                className={"JoinMatchMaking-Btn ml-1 p-2 font-bold text-white border-2 border-solid bg-green-600 border-green-800 hover:bg-green-800 hover:border-green-600 rounded-md"}
                onClick={()=>{
                    if(authAddress(document.getElementById('chessboard-address').value).res){
                        store.dispatch(joinGameWF({chessboard:document.getElementById('chessboard-address').value.replace(/[^\x00-\x7F]/g, "")}))
                    } else { //setError 
                    }
                }}
            >Join!</button>
        </div>
    );
}