//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;
import './ChessBoard.sol';
import 'hardhat/console.sol';
/*
    Creare le eccezioni per:  
        [!]EnPassant,
*/
contract MoveController {    
    uint public maxsteps;
    int private x; int private y;
    ChessBoard private Chessboard; 
   
    function abs(int x_) public pure returns (int _x) { if(x_<0)_x=-x_;else{_x=x_;}}    
    function max(int x_, int y_) public pure returns(int _max){ _max = x_ >= y_ ? _max : y_; }
    function min(int x_, int y_) public pure returns(int _min){ _min = x_ <= y_ ? _min : y_; }
    function increment(int x_) public pure returns(int inc){ if(x_<0)inc=-1;else if(x_>0)inc=1;else inc=0; }
    function arrecc(int x_) public pure returns(int _x){  _x=x_<=7?_x:int(7); }
    function arrdec(int x_) public pure returns(int _x){  _x=x_<=0?_x:int(0); }
    
    modifier yourChessboard{require(msg.sender==address(Chessboard),'');_;}
    modifier pedestrianMod(uint[2] memory oldpos, uint[2] memory newpos, bool team, uint maxsteps_){
            if(Chessboard.getBox(oldpos[0],oldpos[1]).pedina==1){ 
                bool PedfirstMove;maxsteps=maxsteps_;
                if(team){ require(oldpos[0]>newpos[0],'');if(oldpos[0]==6)PedfirstMove=true; else PedfirstMove=false; }
                if(!team){ require(oldpos[0]<newpos[0],'');if(oldpos[0]==1)PedfirstMove=true; else PedfirstMove=false; }   
                if(abs(int(newpos[0])-int(oldpos[0]))==2&&PedfirstMove){ maxsteps=2; }
            }_;
        }
    modifier isArrocco(uint[2] memory oldpos, uint[2] memory newpos){
        if( (oldpos[0]==0&&oldpos[1]==4&&Chessboard.getBox(0,4).pedina==5 && ( ( newpos[0]==0&&newpos[1]==6&&Chessboard.getBox(0,7).pedina==2 )|| (newpos[0]==0&&newpos[1]==2&&Chessboard.getBox(0,0).pedina==2)))||(oldpos[0]==7&&oldpos[1]==3&&Chessboard.getBox(7,3).pedina==5&&((newpos[0]==7&&newpos[1]==6&&Chessboard.getBox(7,7).pedina==2 ) || (newpos[0]==7&&newpos[1]==2&&Chessboard.getBox(7,0).pedina==2 )) ) ){
            maxsteps = 2;
        }_;
    }
    function Direction(uint[2] memory oldpos, uint[2] memory newpos)/**OKOKOK*/ 
        public view /*yourChessboard*/ returns(bool res)    
    {   int _x =(int(newpos[0]) - int(oldpos[0]));
        int _y =(int(newpos[1]) - int(oldpos[1]));
        if(_x!=0&&_y==0) { 
            if(!Chessboard.getRules(Chessboard.getBox(oldpos[0],oldpos[1]).pedina).moves_directions[0]) { res=false; }
            else{res=true;} 
        }
        else if(_y!=0&&_x==0) { 
            if(!Chessboard.getRules(Chessboard.getBox(oldpos[0],oldpos[1]).pedina).moves_directions[1]) { res=false; }
            else{res=true;} 
        }
        else if(_x!=0&&abs(_x)==abs(_y)) {             
            if(Chessboard.getBox(oldpos[0],oldpos[1]).pedina==1&&Chessboard.getBox(newpos[0],newpos[1]).pedina!=0&&abs(_x)==1){  res=true;  }
            else if(!Chessboard.getRules(Chessboard.getBox(oldpos[0],oldpos[1]).pedina).moves_directions[2]&&Chessboard.getBox(oldpos[0],oldpos[1]).pedina!=1) {res=false;}
            else if(Chessboard.getRules(Chessboard.getBox(oldpos[0],oldpos[1]).pedina).moves_directions[2]&&Chessboard.getBox(oldpos[0],oldpos[1]).pedina!=1) {res=true;} 
        }
        else if((abs(_x)==2&&abs(_y)==1)||(abs(_x)==1&&abs(_y)==2)) { 
            if(Chessboard.getBox(oldpos[0],oldpos[1]).pedina!=3) {res=false;}
            else{res=true;} 
        }
        else {res = false;}
    }
    function isObstacled(uint[2] memory oldpos,uint[2] memory newpos)
        public view returns(bool res, uint[2] memory pos)
    {
        int _x =(int(newpos[0]) - int(oldpos[0]));
        int _y =(int(newpos[1]) - int(oldpos[1]));
        int incx = increment(_x); int incy = increment(_y);
        uint i=oldpos[0];uint j=oldpos[1];
                    
        //if(Chessboard.getBox(oldpos[0],oldpos[1]).pedina==1&&Chessboard.getBox(newpos[0], newpos[1]).pedina!=0){ res=false; }

        res = true;
        while(( i!=uint(int(newpos[0])-(incx))  ||  j!=uint(int(newpos[1])-(incy)) )){ 
            i = uint(int(i)+(incx)); 
            j = uint(int(j)+(incy));
            if(Chessboard.getBox(i,j).pedina!=0){
                res = false;
                pos = [i,j];
                break;
            }else {res = true;pos = [i,j];}
        }
        
    }
    modifier logicalControls(uint[2] memory oldpos, uint[2] memory newpos, bool team, uint _maxsteps){
        //require(Chessboard.getBox(oldpos[0],oldpos[1]).color == team, '');//Sposta i Tuoi Pezzi.
        require((oldpos[0]!=newpos[0]||oldpos[1]!=newpos[1]),'');//Spostati...
        if(Chessboard.getBox(newpos[0],newpos[1]).pedina!=0) {require( Chessboard.getBox(newpos[0],newpos[1]).color!=team, '');}//Fuoco Amico.
        
        x=(int(newpos[0]) - int(oldpos[0]));
        y=(int(newpos[1]) - int(oldpos[1]));

        bool dir = Direction(oldpos, newpos);
        require( dir, '');//

        if(Chessboard.getBox(oldpos[0], oldpos[1]).pedina!=3){
            require( maxsteps>=uint(abs(x)) && maxsteps>=uint(abs(y)), '');//Se non arrocchi controllo i passi...
            bool obs; uint[2] memory pos;
            (obs, pos) = isObstacled(oldpos, newpos);
            require(obs, '');       
        }

        _;    
    }
    function MoveControl(uint[2] memory oldpos, uint[2] memory newpos, bool team, uint _maxsteps) 
        public 
        pedestrianMod(oldpos, newpos, team, _maxsteps)
        isArrocco(oldpos, newpos)
        logicalControls(oldpos, newpos, team, maxsteps) 
        returns(bool res){
            
                                            
            res = true;
    }

    constructor(address payable _mychessboard){
        Chessboard = ChessBoard(_mychessboard);
    }
}