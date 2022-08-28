import React from 'react';
import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { showMMConfig } from '../menuSlice';
import { store } from '../../../app/store';
import { useMoralis } from "react-moralis";

export default function BtnMatchM({ name, img, classes, current }) {

    return (
        <div className={"Btn BtnMatchM inline-block mr-2 mt-2 bg-orange-300 p-1 text-orange-800 rounded border-2 border-solid border-orange-800 mb-2 font-semibold "+classes}>
            <button className="" onClick={()=>{store.dispatch(showMMConfig())}}>{name}</button>
        </div>
    );
}