import React, { Component } from 'react';

export default class BoxBtn extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="BoxBtn inline-block">
                {this.props.p}
            </div>
        );
    }
}
