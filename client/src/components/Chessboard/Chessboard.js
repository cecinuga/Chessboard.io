import React, { Component } from 'react';
import Box from './Box';

export default class Chessboard extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        let chessboard = [[]];
        for ( let i = 0; i < 8; i++ ) {
            chessboard[ i ] = [];
            for ( let j = 0; j < 8; j++ ) {
                if(j%2!=0) chessboard[ i ][ j ] = {color:false};
                else chessboard[ i ][ j ] = {color:true}
            }
        }
        console.log(chessboard);


        return(
            <div className="Chessboard w-2/3 h-6 inline-block bg-red-600 mt-4">

            {
            chessboard.map( 
               (row)=>{
                   row.map(
                       (box)=>{
                        return <Box color={box.color}/>
                    })

                })
            }
            </div>
        );
    }
}