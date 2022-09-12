import React, { Component, useState }  from 'react';
import { Graveyard } from './Graveyard/Graveyard';
import { formatAddress, formatPrice } from '../../../fun/formatter';
import { store } from '../../../app/store';

export default function InfoGames() {
  const [ Turner, setTurner ] = useState(formatAddress(''));
  store.subscribe(async()=>{
    if(store.getState().menu.matchmaking.message.status=='payed'&&!store.getState().chess.lastMove.status){
      if(!store.getState().menu.matchmaking.team){ setTurner(formatAddress(store.getState().menu.matchmaking.enemy))}
      else{ setTurner(formatAddress(store.getState().menu.user.ads)); }
    }
    if(store.getState().chess.lastMove.status=="nextmove"){ 
      setTurner(formatAddress(store.getState().chess.turner));
    }
    if(store.getState().chess.lastMove.status=="enemynextmove"){ 
      setTurner(formatAddress(store.getState().menu.user.ads));
    }
  });

  return (
    <div className="InfoGame p-1 mt-2 text-white">
      <div className="InfoGame-WinningPrize border-4 border-solid border-amber-200 p-1 rounded-md">
        <div className="InfoGame-WinningPrize-label inline-block font-4xl font-semibold text-amber-400">Prize: </div>
        <div className="InfoGame-WinningPrize-value inline-block font-4xl font-bold ml-4 bg-amber-400 border-solid border-2 border-amber-500 text-orange-500 rounded-lg px-1 py-1">{formatPrice(String(store.getState().menu.matchmaking.quote*2))}</div>
      </div>
      <div className="InfoGame-Turner mt-3">
        <div className="InfoGame-Turner-label inline-block font-2xl font-semibold">Turner: </div>
        <div id="InfoGame-Turner-value" className="InfoGame-Turner-value inline-block font-2xl font-semibold ml-4 bg-orange-400 border-solid border-2 border-orange-500 rounded-full px-1 py-1">{Turner}</div>
      </div>
      <div className="InfoGame-Graveyards font-2xl font-semibold rounded-md bg-amber-600 p-1 mt-2">
        <div className="text-center">Graveyards: </div>
        <Graveyard key={0} color={true}/>
        <Graveyard key={1} color={false}/>
      </div>
    </div>
  );
}