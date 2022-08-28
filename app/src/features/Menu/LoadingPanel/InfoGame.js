import React, { Component }  from 'react';
import { formatAddress, formatPrice } from '../../../fun/formatter';
import { store } from '../../../app/store';
export default function InfoGames() {
  return (
    <div className="InfoGame p-1 mb-2 text-white">
      <div className="InfoGame-Turner">
        <div className="InfoGame-Turner-label inline-block font-2xl font-semibold">Turner: </div>
        <div className="InfoGame-Turner-value inline-block font-2xl font-semibold ml-4 bg-orange-400 border-solid border-2 border-orange-500 rounded-full px-2 py-1">{formatAddress(String(store.getState().chess.turner))}</div>
      </div>
      <div className="InfoGame-WinningPrize">
        <div className="InfoGame-WinningPrize-label inline-block font-2xl font-semibold">Prize: </div>
        <div className="InfoGame-WinningPrize-value inline-block font-2xl font-semibold ml-4 bg-orange-400 border-solid border-2 border-orange-500 rounded-full px-2 py-1">{formatPrice(String(store.getState().menu.matchmaking.quote*2))}</div>
      </div>
    </div>
  );
}