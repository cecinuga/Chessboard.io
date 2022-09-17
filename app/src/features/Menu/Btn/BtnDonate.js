import React from 'react';
import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { showMMConfig } from '../menuSlice';
import { store } from '../../../app/store';
import { useMoralis } from "react-moralis";

export default function BtnDonate({ name, img, classes, current }) {

    return (
        <div className={"Btn BtnDonate inline-block mr-2 mt-2 bg-slate-200 hover:bg-slate-300 p-1 text-slate-800 hover:text-slate-700 rounded border-2 border-solid border-slate-800 mb-2 font-semibold "+classes}>
            <button className="" onClick={()=>{store.dispatch(showMMConfig())}}>{name}</button>
        </div>
    );
}