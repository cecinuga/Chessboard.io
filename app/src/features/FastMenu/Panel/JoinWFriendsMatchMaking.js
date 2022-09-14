import React, {useState, useEffect} from 'react';
import { store } from '../../../app/store';
import { authAddress } from '../../../fun/matchmaking';

export default function JoinWFriendsMatchMaking(){
    
     return (
        <div className="JoinMatchMaking bg-zinc-600 p-2 rounded-md">
            <div className="text-white text-2xl font-bold mb-2">Join Friend Game </div>
            <input
                className='JoinMatchMaking-Input p-2 rounded placeholder:text-amber-600 placeholder:font-bold'
                type="text"
                placeholder="Chessboard Address"
                id="friends-address"
            />
            <button
                className={"JoinMatchMaking-Btn ml-1 p-2 font-bold text-white border-2 border-solid bg-green-600 border-green-800 hover:bg-green-800 hover:border-green-600 rounded-md"}
                onClick={()=>{
                    if(authAddress(document.getElementById('friends-address').value).res){

                    }
                }}
            >Join!</button>
        </div>
    );
}