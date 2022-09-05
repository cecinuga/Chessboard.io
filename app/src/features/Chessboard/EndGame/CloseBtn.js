import React, { useState, useEffect } from 'react';
import { store } from '../../../app/store';
import { RestartGame } from '../../../features/Menu/menuSlice'
import { ResetChessboard } from '../chessSlice';
export default function CloseBtn(props){
    return (
    <button 
        onClick={()=>{
            store.dispatch(ResetChessboard());
            store.dispatch(RestartGame());}}
        className="text-white font-4xl bg-green-500 hover:bg-green-400 border-2 border-solid border-green-800 hover:border-green-800 p-2 rounded-md font-bold">
        Restart!
    </button>)
}