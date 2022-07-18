import React, { useState, useEffect }  from 'react';
import { store } from '../../../app/store';
import { newGame } from '../menuAPI';

export default function PreMatchMaking(from, to){
    function authData(from, to){
        store.dispatch(newGame({from:from, to:to})).then(()=>{console.log(store.getState())})
    }

    return(
        <div className="PrizeMatchMaking p-2 text-white font-semibold">
            <div className="Prize inline-block mr-2">Y Quotes: </div>
            <select
                name="Currency"
                id="Currency"
                className="mr-2 rounded p-1 text-amber-800">
                <option value="" className="font-normal">ether</option>
                <option value="">finney</option>
                <option value="">szabo</option> 
            </select>
            <label
                htmlFor="Prize-from"
                className="mr-2">From:</label>
            <input 
                id="Prize-from"
                className="inline-block w-14 rounded text-black p-1 mr-2"
                type="text"/>
            <label
                htmlFor="Prize-to"
                className="mr-2">To:</label>
            <input 
                id="Prize-to"
                className="inline-block w-14 rounded text-black p-1 mr-2"
                type="text"/>
            <button 
                onClick={()=>{authData(document.getElementById('Prize-from').value, document.getElementById('Prize-to').value)}}
                className="bg-amber-400 p-1 text-amber-800 rounded"
                >Start!
            </button>
        </div>
    );
}