import React, { Component } from 'react';
import BoxBtn from './BoxBtn';

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
                            'bg-red-800 Box w-12 h-12 text-center text-white':
                            'bg-red-800 Box w-12 h-12 text-center text-black':
                        (this.props.team)?
                            'bg-amber-800 Box w-12 h-12 text-center text-white':
                            'bg-amber-800 Box w-12 h-12 text-center text-black'
                    }> 
                {this.props.p}
            </div>
        );
    }
}
