import React, { Component } from 'react';
import ChessBoard from '../../artifacts/ChessBoard.json';
import { store } from '../../app/store';
import { Move } from './chessSlice';
import Box from './Box';
import Col from './Col';

export default class Chessboard extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        let row = [];
        for ( let i = 0; i < 8; i++ ) { row.push(i);}
        
        return(
            <div className="Chessboard w-2/3 inline-block text-center bg-amber-400 rounded">
            {
                row.map((col)=>{
                    return(<Col key={col} x={col}/>);
                })
            }
            </div>
        );
    }
}