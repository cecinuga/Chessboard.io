import React, { Component }  from 'react';
import { store } from './../../app/store';
import { newGame } from './menuSlice';
import MatchMaking from './LoadingPanel/MatchMaking';

export default function FastMenu() {
  store.subscribe( ()=>{
    if(store.getState().menu.matchmaking.status=='pending'){
      console.log('matchmaking avviato...');

    }
  });

  return (
    <div className="FastMenu w-1/3 bg-green-600 inline-block rounded">
      <div className="LoadingMatchMaking">
        
      </div>
    </div>
  );
}