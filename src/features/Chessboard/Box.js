import React, { Component } from 'react';
import { store } from '../../app/store';

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
                            'Box bg-amber-800  text-center text-white':
                            'Box bg-amber-800 text-center text-black'
                    }> 
                <input 
                    type="checkbox"
                    id={"Box-"+String(this.props.coo)} 
                    value={this.props.p}
                    className="w-12 h-12"
                    onChange={()=>{
                        //DISPATCH EVENT
                        console.log(store.getState());
                    }}
                /> {this.props.p}
            </div>
        );
    }
}
