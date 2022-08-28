import React, { Component }  from 'react';
import MMlogo from '../../../public/matchmaking3.gif';

export default function MatchMaking() {
  return (
    <div className="MatchMaking z-3 w-5/6 text-center bg-amber-600 inline-block rounded">
      <img src={MMlogo} className=""></img>
      <div className="text-white font-semibold text-2xl p-4">Loading... </div>
    </div>
  );
}