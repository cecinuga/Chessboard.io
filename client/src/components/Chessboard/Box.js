import React, { Component } from 'react';
import BoxBtn from './BoxBtn';
//import { Step } from '../../features/moveSlice'

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
                        console.log('----------------')
                        console.log('piece: '+this.props.p) 
                        console.log('coordinates: '+this.props.coo)
                        console.log('id: '+'Box-'+this.props.coo)
                        console.log('----------------')
                        //DISPATCH EVENT
                    }}
                /> {this.props.p}
            </div>
        );
    }
}
