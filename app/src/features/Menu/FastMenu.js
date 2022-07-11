import React, { useState }  from 'react';
import { store } from './../../app/store';
import { newGame } from './menuSlice';
import MatchMaking from './LoadingPanel/MatchMaking';

export default function FastMenu() {
  const [display, setDisplay] = useState('hidden');
  store.subscribe( ()=>{
    if(store.getState().menu.matchmaking.message.status=='pending'){
      console.log('matchmaking avviato...');
      setDisplay('block');
    }
    if(store.getState().menu.matchmaking.message.status=='fulfilled'){
      console.log('matchmaking completato...');    
      setDisplay('hidden');  
    }
    if(store.getState().menu.matchmaking.message.status=='rejected'){
      console.log('matchmaking annullato...');    
      setDisplay('hidden');  
    }
  });

  return (
    <div className="FastMenu w-1/3 bg-amber-200 inline-block rounded">
      <div
        id="LoadingMatchMaking" 
        className={"LoadingMatchMaking py-4 z-3 text-center bg-rose-200 opacity-80 "+display}>
        <MatchMaking />
      </div>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br>
    </div>
  );
}