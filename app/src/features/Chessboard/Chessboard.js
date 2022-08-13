import React, { useState, useEffect } from 'react';
import ChessBoard from '../../artifacts/ChessBoard.json';
import { store } from '../../app/store';
import { Move } from './chessSlice';
import Box from './Box';
import Col from './Col';

export default function Chessboard() {   
        let row = [];
        for ( let i = 0; i < 8; i++ ) { row.push(i); }
        const [ content, setContent ] = useState('hidden');

        store.subscribe(()=>{
            if(store.getState().menu.matchmaking.message.status=='letsplaytg'){
                console.log("bene, ora c'è da giocare.")
                setContent('block')
            }
            if(store.getState().chess.lastMove.secondStep!=''){
                console.log("spostiamo sti pezzi va")
                let className;
                if(store.getState().menu.matchmaking.team){ className = 'text-white' }
                else if(!store.getState().menu.matchmaking.team){ className = 'text-black' }
                document.getElementById('Box-p-'+store.getState().chess.lastMove.secondStep).innerHTML = store.getState().chess.lastMove.piece;
                document.getElementById('Box-p-'+store.getState().chess.lastMove.firstStep).innerHTML = '';
                document.getElementById('Box-p-'+store.getState().chess.lastMove.secondStep).className = className
                document.getElementById('Box-'+store.getState().chess.lastMove.secondStep).checked = false;
                document.getElementById('Box-'+store.getState().chess.lastMove.firstStep).checked = false; 
            }
        })

        return(
            <div className="Chess p-4 w-2/3 inline-block text-center bg-amber-400 rounded">
                <div className="Enemy">{store.getState().menu.matchmaking.enemy}</div>

                <div className="Chessboard">
                    {
                        row.map((col)=>{
                            return(<Col key={col} x={col}/>);
                        })
                    }
                </div>

                <div className="Player">{store.getState().menu.user.ads}</div>

            </div>
        );
}