import React, { Component } from 'react';
import { store } from '../../app/store';
import { Move } from './chessSlice';
import { useMoralisWeb3Api } from "react-moralis";

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
                    className="w-12 h-12"
                    onChange={()=>{
                        store.dispatch(Move({ step:this.props.coo, piece:this.props.p, }));
                        console.log(store.getState().chess.lastMove)
                        if(store.getState().chess.lastMove.secondStep!=''&&store.getState().chess.lastMove.firstStep!=''&&store.getState().chess.lastMove.piece!=''){
                            //CHIAMA LO SMART CONTRACT
                        }
                   
                    }}
                /> {this.props.p}
            </div>
        );
    }
}
