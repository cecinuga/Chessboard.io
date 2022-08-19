//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;
import './MoveController.sol';
import './ChessBoard.sol';
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
        uint inc = uint(Movecontroller.min(Movecontroller.min(int(newpos[0]), int(7)-int(newpos[0])), Movecontroller.min(int(newpos[1]), int(7)-int(newpos[1]))));
        (res, pos) = Movecontroller.isObstacled(newpos, [0, newpos[1]]);///-x
        if(!res&&Movecontroller.Direction(pos, newpos)&&Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[0])-int(newpos[0])))&&Chessboard.getBox(pos[0],pos[1]).color!=team){
            return ( true, pos);
        }//-x

        (res, pos) = Movecontroller.isObstacled(newpos, [7, newpos[1]]);//+x
        if(!res&&Movecontroller.Direction(pos, newpos)&&Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[0])-int(newpos[0])))&&Chessboard.getBox(pos[0],pos[1]).color!=team){
            return ( true, pos);
        }//+x

        (res, pos) = Movecontroller.isObstacled(newpos, [newpos[0], 0]);//-y
        if(!res&&Movecontroller.Direction(pos, newpos)&&Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&Chessboard.getBox(pos[0],pos[1]).color!=team){
            return ( true, pos);
        }//-y     

        (res, pos) = Movecontroller.isObstacled(newpos, [newpos[0], 7]);//+y
        if(!res&&Movecontroller.Direction(pos, newpos)&&Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&Chessboard.getBox(pos[0],pos[1]).color!=team){
            return ( true, pos);
        }//+y        

        //GESTIRE LA DIREZIONE DELLA PEDINA E IL MAXSTEPS PER LE DIAGONALI
        (res, pos) = Movecontroller.isObstacled(newpos, [newpos[0]+inc,newpos[1]-inc ]);//ok
        if(!res&&Movecontroller.Direction(pos, newpos)&&Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&Chessboard.getBox(pos[0],pos[1]).color!=team){
            return ( true, pos);
        }//+x-y

        (res, pos) = Movecontroller.isObstacled(newpos, [newpos[0]-inc,newpos[1]-inc]);//ok
        if(!res&&Movecontroller.Direction(pos, newpos)&&Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&Chessboard.getBox(pos[0],pos[1]).color!=team){
            return ( true, pos);
        }//-x-y               

        (res, pos) = Movecontroller.isObstacled(newpos, [newpos[0]-inc,newpos[1]+inc]);//ok
        if(!res&&Movecontroller.Direction(pos, newpos)&&Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&Chessboard.getBox(pos[0],pos[1]).color!=team){
            return ( true, pos);
        }//-x+y              

        (res, pos) = Movecontroller.isObstacled(newpos, [newpos[0]+inc,newpos[1]+inc]);//ok
        if(!res&&Movecontroller.Direction(pos, newpos)&&Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&Chessboard.getBox(pos[0],pos[1]).color!=team){
            return ( true, pos);
        }//+x+y          */
        return ( false, pos );
    }
    

    constructor(address _gamecontrol, address payable _chessboard){
        Movecontroller = MoveController(_gamecontrol);
        Chessboard = ChessBoard(_chessboard);
    }   
}










