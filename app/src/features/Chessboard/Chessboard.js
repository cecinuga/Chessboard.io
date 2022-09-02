import React, { useState, useEffect } from 'react';
import ChessBoard from '../../artifacts/ChessBoard.json';
import { store } from '../../app/store';
import { Move } from './chessAPI';
import Box from './Box';
import FastMenu from '../FastMenu/FastMenu';
import { ethers, signer } from '../../App';
import { changeTurnerListener } from '../../fun/chessboard'
import { formatAddress, formatPrice } from '../../fun/formatter';

export default function Chessboard() {   
        let row = [];
        for ( let i = 0; i < 8; i++ ) { row.push(i); }
        let col = [];
        for(let i=0; i<8; i++){ col.push(i) }
        const p = ['01','11','21','31','41','51','61','71','06','16','26','36','46','56','66','76']
        const t = ['00','70','07','77']
        const c = ['10','60','17','67']
        const a = ['20','50','27','57']
        const q = ['40','47']
        const k = ['30','37']

        const [ content, setContent ] = useState('hidden');
        const [ Rotate, setRotate ] = useState('');
        const boxes = document.getElementsByClassName('Boxes');


        store.subscribe(async ()=>{
            console.log(store.getState())
            if(store.getState().menu.matchmaking.message.status=='payed'&&store.getState().chess.lastMove.status!='nextmove'&&!store.getState().menu.matchmaking.team){
                setRotate('rotate-180');
            }
            if(store.getState().menu.matchmaking.message.status=='letsplaytg'){
                console.log("bene, ora c'è da giocare.")
                setContent('block')
            }
            if(store.getState().chess.status=='notyturn'){
                const el = document.getElementsByClassName('Boxes')
                for(let i=0; i<el.length; i++){
                    el.item(i).checked = false;
                }
            }
        })
   
        return(
            <div className="Chess p-5 w-full inline-block rounded relative">
                <div className="FastMenu-container md:w-full xl:w-2/6 text-center md:block xl:inline-block">
                    <div className="FastMenu w-4/6 text-center relative xl:left-36 xl:bottom-56">
                        <FastMenu />
                    </div>
                </div>
                <div className="Chessboard_ w-4/6 inline-block text-left">
                    <div className="_Chessboard_ border-8 border-solid border-orange-800 bg-orange-700 px-10 py-2 rounded-md w-fit text-center">
                        <div className="Enemy rounded-full w-fit relative bg-orange-400 mb-2 p-2 border-2 border-solid border-orange-600 text-white font-semibold inline-block">{formatPrice(store.getState().menu.matchmaking.enemy)}</div>
                        <div 
                            className={"Chessboard relative border-8 border-solid border-orange-600 rounded-md "+Rotate}
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

                                                if(y==7||y==6) return(<Box key={String(x)+String(y) } coo={String(x)+String(y) } p={piece} team={team} color={' text-white'}/>);
                                                else if(y==0||y==1) return(<Box key={String(x)+String(y) } coo={String(x)+String(y) } p={piece} team={team} color={' text-black'}/>);
                                                else{ return(<Box key={String(x)+String(y) } coo={String(x)+String(y) } p={piece} team={team} color={' text-black'}/>);}
                                            })}
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className="Player rounded-full w-fit relative bg-orange-400 mt-2 p-2 border-2 border-solid border-orange-600 text-white font-semibold inline-block">{formatPrice(store.getState().menu.user.ads)}</div>
        
                    </div>
                </div>
            </div>
        );
}