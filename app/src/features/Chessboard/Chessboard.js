import React, { useState, useEffect } from 'react';
import ChessBoard from '../../artifacts/ChessBoard.json';
import { store } from '../../app/store';
import { Move } from './chessAPI';
import Box from './Box';
import { changeTurnerListener } from '../../fun/chessboard'

export default function Chessboard() {   
        let row = [];
        for ( let i = 0; i < 8; i++ ) { row.push(i); }
        let col = [];
        for(let i=0; i<8; i++){ col.push(i) }
        const p = ['01','11','21','31','41','51','61','71','06','16','26','36','46','56','66','76']
        const t = ['00','70','07','77']
        const c = ['10','60','17','67']
        const a = ['20','50','27','57']
        const q = ['30','37']
        const k = ['40','47']

        const [ content, setContent ] = useState('hidden');
        const boxes = document.getElementsByClassName('Boxes');


        store.subscribe(async ()=>{
            console.log(store.getState())
            if(store.getState().menu.matchmaking.message.status=='letsplaytg'){
                console.log("bene, ora c'è da giocare.")
                setContent('block')
            }
            if(store.getState().chess.lastMove.firstStep!=''&&store.getState().chess.lastMove.secondStep!=''){
                console.log("spostiamo sti pezzi va")
                console.log(store.getState().chess.lastMove)
                let className;
                if(store.getState().menu.matchmaking.team){ className = 'text-white' }
                else if(!store.getState().menu.matchmaking.team){ className = 'text-black' }
                
                document.getElementById('Box-p-'+store.getState().chess.lastMove.secondStep).innerHTML = store.getState().chess.lastMove.piece;
                document.getElementById('Box-p-'+store.getState().chess.lastMove.firstStep).innerHTML = '';
                document.getElementById('Box-p-'+store.getState().chess.lastMove.secondStep).className = className
                document.getElementById('Box-'+store.getState().chess.lastMove.firstStep).checked = false; 
                document.getElementById('Box-'+store.getState().chess.lastMove.secondStep).checked = false;
                //inserire ascoltatore per capire quando l'avversario ha mosso e cambiare il dom
                const turn = changeTurnerListener();
                console.log('turn: '+turn)
            }  
        })
   
        return(
            <div className="Chess p-4 w-2/3 inline-block text-center bg-amber-400 rounded relative">
                <div className="Enemy">{store.getState().menu.matchmaking.enemy}</div>

                <div 
                    className="Chessboard inline-block"
                    id="Chessboard"    
                >
                    {
                        row.map((x)=>{
                            return( 
                                <div key={x} className={'Col-'+x+' inline-block'}>{
                                    col.map((y)=>{
                                        let team;
                                        let piece;
                                        if(y==0||y==1) team=false
                                        if(y==6||y==7) team=true
                                        
                                        p.map((coo)=>{ if(coo==String(x)+String(y)){piece='p'} })
                                        t.map((coo)=>{ if(coo==String(x)+String(y)){piece='t'} })
                                        c.map((coo)=>{ if(coo==String(x)+String(y)){piece='c'} })
                                        a.map((coo)=>{ if(coo==String(x)+String(y)){piece='a'} })
                                        q.map((coo)=>{ if(coo==String(x)+String(y)){piece='q'} })
                                        k.map((coo)=>{ if(coo==String(x)+String(y)){piece='k'} })

                                        if((x%2==0&&y%2!=0)||(x%2!=0&&y%2==0)) return(<Box key={String(x)+String(y) } coo={String(x)+String(y) } p={piece} team={team} color={true}/>);
                                        else if((x%2==0&&y%2==0)||(x%2!=0&&y%2!=0)) return(<Box key={String(x)+String(y) } coo={String(x)+String(y) } p={piece} team={team} color={false}/>);
                                    })}
                                </div>
                            );
                        })
                    }
                </div>

                <div className="Player">{store.getState().menu.user.ads}</div>
            </div>
        );
}