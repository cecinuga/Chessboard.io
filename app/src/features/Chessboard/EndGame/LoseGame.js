import React, {useState, useEffect} from 'react';
import {store} from '../../../app/store'

export default function LoseGame(){
    return <div>
        <div className="text-center text-white p-2 font-4xl font-semibold text-red-500">...Ops, You Lose...</div>
        <div className="text-center text-white font-3xl font-semibold"><div className="">Check your Wallet for: </div><div className="inline-block font-6xl">-{store.getState().menu.matchmaking.quote}</div> Eth</div>
    </div>
}