import React, { useState, useEffect }  from 'react';
import { store } from '../../../app/store';
import { newGame } from '../menuAPI';

export default function PreMatchMaking(from, to){
    function authData(from, to){
        store.dispatch(newGame({from:from, to:to})).then(()=>{console.log(store.getState())})
    }

    return(
        <div className="PrizeMatchMaking p-1 pb-2 mb-2 text-white font-semibold bg-amber-600 rounded text-center">
            <select
                name="Currency"
                id="Currency"
                className="mr-2 mt-1 rounded p-1 text-amber-800">
                <option value="" className="font-normal">ether</option>
                <option value="">finney</option>
                <option value="">szabo</option> 
            </select>
            <br />
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
                className="inline-block w-14 rounded text-black p-1 mr-5"
                type="text"/>
            <button 
                onClick={()=>{authData(document.getElementById('Prize-from').value, document.getElementById('Prize-to').value)}}
                className="bg-amber-800 p-1 mt-5 text-lg text-white rounded inline-block"
                >Start!
            </button>
        </div>
    );
}