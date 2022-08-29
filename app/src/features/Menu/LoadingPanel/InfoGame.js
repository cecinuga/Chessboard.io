import React, { Component }  from 'react';
import { Graveyard } from './Graveyard';
import { formatAddress, formatPrice } from '../../../fun/formatter';
import { store } from '../../../app/store';

export default function InfoGames() {
  return (
    <div className="InfoGame p-1 mt-2 text-white">
      <div className="InfoGame-WinningPrize border-2 border-solid border-amber-200 p-1 rounded-md">
        <div className="InfoGame-WinningPrize-label inline-block font-4xl font-semibold text-amber-400">Prize: </div>
        <div className="InfoGame-WinningPrize-value inline-block font-4xl font-bold ml-4 bg-amber-400 border-solid border-2 border-amber-500 text-orange-500 rounded-lg px-1 py-1">{formatPrice(String(store.getState().menu.matchmaking.quote*2))}</div>
      </div>
      <div className="InfoGame-Turner mt-3">
        <div className="InfoGame-Turner-label inline-block font-2xl font-semibold">Turner: </div>
        <div id="InfoGame-Turner-value" className="InfoGame-Turner-value inline-block font-2xl font-semibold ml-4 bg-orange-400 border-solid border-2 border-orange-500 rounded-full px-2 py-1">{formatAddress(String(store.getState().chess.turner))}</div>
      </div>
      <div className="InfoGame-Graveyards font-2xl font-semibold">
        <Graveyard color={true}/>
        <Graveyard color={false}/>
      </div>
    </div>
  );
}