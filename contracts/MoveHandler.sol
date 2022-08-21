//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;
import './MoveController.sol';
import './ChessBoard.sol';
import "hardhat/console.sol";

/*
    [!]Scacco di Scoperta,
*/
contract MoveHandler {
    MoveController Movecontroller;
    ChessBoard Chessboard;

    modifier onlyYourChessboard{require(msg.sender==address(Chessboard),'');_;}
    modifier onlyYourController{require(msg.sender==address(Movecontroller),'');_;}

    function isCheckMate(bool team) public view returns(bool checked, bool nopos){
        if(Chessboard.getCheck(team)&&NoMorePos(team)){ checked=true;nopos=true; }
        else if(!Chessboard.getCheck(team)&&NoMorePos(team)){ checked = false;nopos=true; }
        else { checked = false;nopos=false; }
    } 

    function NoMorePos(bool team)
        public view onlyYourChessboard returns(bool){
            uint[2] memory pos = Chessboard.getKing(team);
            uint[2] memory poss;
            bool res1;bool res2;bool res3;bool res4;
            bool res5;bool res6;bool res7;bool res8;
            (res1, poss)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])+1)), pos[1]], team );
            (res2, poss)=isEvilBox( [uint(Movecontroller.arrdec(int(pos[0])-1)), pos[1]], team );
            (res3, poss)=isEvilBox( [pos[0], uint(Movecontroller.arrecc(int(pos[1])+1))], team );
            (res4, poss)=isEvilBox( [pos[0], uint(Movecontroller.arrecc(int(pos[1])-1))], team );
            (res5, poss)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])+1)), uint(Movecontroller.arrecc(int(pos[1])+1))], team );
            (res6, poss)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])+1)), uint(Movecontroller.arrecc(int(pos[1])-1))], team );
            (res7, poss)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])-1)), uint(Movecontroller.arrecc(int(pos[1])+1))], team );
            (res8, poss)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])-1)), uint(Movecontroller.arrecc(int(pos[1])-1))], team );

            if(res1&&res2&&res3&&res4&&res5&&res6&&res7&&res8){ return true; }
            return false;
        }


    function isEvilBox(uint[2] memory newpos, bool team) 
        public view returns(bool res, uint[2] memory pos) {

        /*PROGETTARE NUOVA FUNZIONE YUPPI */
        uint[8] memory posx;
        uint[8] memory posy; 
        posx[0] = 0; 
        posy[0] = newpos[1];//-x
        posx[1] = 7; 
        posy[1] = newpos[1];//+x
        posx[2] = newpos[0]; //-y
        posy[2] = 0;
        posx[3] = newpos[0]; //+y
        posy[3] = 7;
        posx[4] = newpos[0]-uint(Movecontroller.min(int(newpos[0]), int(newpos[1])));//-x-y
        posy[4] = newpos[1]-uint(Movecontroller.min(int(newpos[0]), int(newpos[1])));
        posx[5] = newpos[0]+7-uint(Movecontroller.max(int(newpos[0]), int(newpos[1])));//+x+y
        posy[5] = newpos[1]+7-uint(Movecontroller.max(int(newpos[0]), int(newpos[1])));
        if(newpos[0]<newpos[1]){
            posx[6] = newpos[1]-newpos[1];//-x+y
            posy[6] = uint(Movecontroller.arrecc(int(newpos[1])+int(newpos[0])));
            
            posx[7] = uint(Movecontroller.arrecc(int(newpos[0])+int(newpos[1])));//+x-y
            posy[7] = newpos[0]-newpos[0];
        } else { 
            posx[6] = newpos[0]-newpos[0];//-x+y
            posy[6] = uint(Movecontroller.arrecc(int(newpos[0])+int(newpos[1])));

            posx[7] = uint(Movecontroller.arrecc(int(newpos[1])+int(newpos[0])));//+x-y
            posy[7] = newpos[1]-newpos[1];
        }
        for(uint i=0; i<posx.length; i++){
            (res, pos) = Movecontroller.isObstacled(newpos, [posx[i],posy[i]]);//ok
            /*console.log('.----------.');
            console.log(res);
            console.logUint(pos[0]);
            console.logUint(pos[1]);*/

            if(Movecontroller.Direction(pos, newpos)&&
               Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&
               Chessboard.getBox(pos[0],pos[1]).color!=team){
               return ( true, pos);
            }
        }
        /*console.log('------------');
        console.logUint(posx[4]);
        console.logUint(posy[4]);
        console.logUint(pos[0]);
        console.logUint(pos[1]);*/
        return ( false, pos );
    }
    

    constructor(address _gamecontrol, address payable _chessboard){
        Movecontroller = MoveController(_gamecontrol);
        Chessboard = ChessBoard(_chessboard);
    }   
}










