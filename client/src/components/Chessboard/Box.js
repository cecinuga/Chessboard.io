import React, { Component } from 'react';

export default class Box extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div 
                id={this.props._id} 
                className={"Box"} >
                    cisos
            </div>
        );
    }
}
