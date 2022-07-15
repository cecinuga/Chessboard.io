import React, { useState, useEffect }  from 'react';
import { store } from '../../../app/store';
import { newGame } from '../menuAPI';

export default function PreMatchMaking(){
    function authData(){
        store.dispatch(newGame()).then(()=>{console.log(store.getState())})
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
            <input 
                id="Prize"
                className="inline-block w-1/6 rounded text-black p-1 mr-4"
                type="text"/>
            <button 
                onClick={()=>{authData()}}
                className="bg-amber-400 p-1 text-amber-800 rounded"
                >Start!
            </button>
        </div>
    );
}