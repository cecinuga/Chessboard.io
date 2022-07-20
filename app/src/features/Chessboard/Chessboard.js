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