import React, {Component, useState, useEffect } from 'react'
import WinningGame from './WinningGame'
import LoseGame from './LoseGame'
import CloseBtn from './CloseBtn'

export default function EndGamePanel(props){
    const [Win, setWin] = useState(false)
    useEffect(() =>{
        setWin(props.win)
    });

    return (
        <div className="EndGame w-2/6 bg-amber-500 border-4 border-solid border-amber-700 relative top-44 left-1/3 rounded-md">
            {(Win)?<WinningGame />:<LoseGame />}
            <div className="text-center py-4"><CloseBtn /></div>
        </div>
    );
}