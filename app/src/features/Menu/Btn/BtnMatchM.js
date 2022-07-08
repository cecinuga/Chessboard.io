import React from 'react';
import { useMoralisQuery } from "react-moralis";
import { newGame } from '../menuSlice';
import { store } from '../../../app/store';
import { useMoralis } from "react-moralis";

export default function BtnMatchM({ name, img, classes, current }) {
    const { fetch } = useMoralisQuery(
        "WRoom",
        (query)=>query.equalTo("status","ok"),
        [],
    );   

    return (
        <div className={"Btn BtnMatchM inline-block mr-2 mt-2 bg-white p-1 text-red-800 rounded border-2 border-solid border-red-800 mb-2"+classes}>
            <button className="" onClick={()=>{ store.dispatch(newGame({ fetch })).then(()=>{console.log(store.getState())}) }}>{name}</button>
        </div>
    );
}