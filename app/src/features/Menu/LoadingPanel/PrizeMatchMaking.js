import React, { useState, useEffect }  from 'react';
import { store } from '../../../app/store';
import { newGame } from '../menuAPI';

export default function PreMatchMaking(from, to){
    function authData(from, to){
        store.dispatch(newGame({from:from, to:to})).then(()=>{console.log(store.getState())})
    }

    return(
        <div className="PrizeMatchMaking p-1 pb-2 mb-2 text-white font-semibold bg-amber-600 rounded text-center">
             <div>
                <label
                    htmlFor="Prize-from"
                    className="mr-2 text-lg">From:</label>
                <input 
                    id="Prize-from"
                    className="inline-block w-14 rounded text-black p-1 mr-2"
                    type="text"/>
                <label
                    htmlFor="Prize-to"
                    className="mr-2 text-lg">To:</label>
                <input 
                    id="Prize-to"
                    className="inline-block w-14 rounded text-black p-1 mr-2"
                    type="text"/>
                
                <button 
                    onClick={()=>{authData(document.getElementById('Prize-from').value, document.getElementById('Prize-to').value)}}
                    className="hover:bg-green-700 bg-green-600 border-2 border-solid hover:border-green-600 border-green-800 p-1 mt-2 text-lg text-white rounded inline-block"
                    >Start!
                </button>
            </div>
        </div>
    );
}