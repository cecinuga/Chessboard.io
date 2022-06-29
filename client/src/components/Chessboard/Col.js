import React, { Component } from 'react';
import Box from './Box'

export default class Col extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const p = ['01','11','21','31','41','51','61','71','06','16','26','36','46','56','66','76']
        const t = ['00','70','07','77']
        const c = ['10','60','17','67']
        const a = ['20','50','27','57']
        const q = ['30','37']
        const k = ['40','47']
        let col = [];
        for(let i=0; i<8; i++){col[i]=i;}
        return(
            <div className="Col inline-block">
            {col.map((y)=>{
                let team;
                let piece;
                if(y==0||y==1) team=false
                if(y==6||y==7) team=true
                
                p.map((coo)=>{ if(coo==String(this.props.x)+String(y)){piece='p'} })
                t.map((coo)=>{ if(coo==String(this.props.x)+String(y)){piece='t'} })
                c.map((coo)=>{ if(coo==String(this.props.x)+String(y)){piece='c'} })
                a.map((coo)=>{ if(coo==String(this.props.x)+String(y)){piece='a'} })
                q.map((coo)=>{ if(coo==String(this.props.x)+String(y)){piece='q'} })
                k.map((coo)=>{ if(coo==String(this.props.x)+String(y)){piece='k'} })

                if(this.props.x%2==0&&y%2!=0) return(<Box key={String(this.props.x)+String(y) } coo={String(this.props.x)+String(y) } p={piece} team={team} color={true}/>);
                else if(this.props.x%2==0&&y%2==0) return(<Box key={String(this.props.x)+String(y) } coo={String(this.props.x)+String(y) } p={piece} team={team} color={false}/>);
                if(this.props.x%2!=0&&y%2!=0) return(<Box key={String(this.props.x)+String(y) } coo={String(this.props.x)+String(y) } p={piece} team={team} color={false}/>);
                else if(this.props.x%2!=0&&y%2==0) return(<Box key={String(this.props.x)+String(y) } coo={String(this.props.x)+String(y) } p={piece} team={team} color={true}/>);
            })}
            </div>
        );
    }
}
