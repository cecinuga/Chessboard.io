import React, { Component } from 'react';
import { store } from '../../app/store';
import { Move } from './chessSlice';
import ChessBoard from '../../artifacts/ChessBoard.json'; 
import Web3 from 'web3';

export default class Box extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div 
                id={this.props.id}
                className={
                    (this.props.color)?
                        (this.props.team)?
                            'Box bg-red-800 text-center text-white':
                            'Box bg-red-800 text-center text-black':
                        (this.props.team)?
                            'Box bg-amber-800 text-center text-white':
                            'Box bg-amber-800 text-center text-black'
                    }> 
                <input 
                    type="checkbox"
                    id={"Box-"+String(this.props.coo)} 
                    value={this.props.p}
                    className="Boxes w-12 h-12"
                    onChange={()=>{//PASSARE DESTRUTTURANDO LA FUNZIONE RUN CONTRACT MORALIS PER CHESSSLICE.JS
                        store.dispatch(Move({ step:this.props.coo, piece:this.props.p, }))
                            .then(
                                ()=>console.log(store.getState().chess.lastMove)
                            );
                    }}
                /> {this.props.p}
            </div>
        );
    }
}
