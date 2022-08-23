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
        /*console.log('------------');
        console.log(Chessboard.getCheck(team));
        console.log(NoMorePos(team));*/
        if(Chessboard.getCheck(team)&&NoMorePos(team)){ checked=true;nopos=true; }
        else if(!Chessboard.getCheck(team)&&NoMorePos(team)){ checked = false;nopos=true; }
        else { checked = false;nopos=false; }
        console.log(',,,,,,,,,,,,,,,,,,,,');
        console.log(checked);
        console.log(nopos);
    } 

    function NoMorePos(bool team)
        public view onlyYourChessboard returns(bool){
            /*console.log('pos');
            console.logUint(pos[0]);console.logUint(pos[1]);*/
            //PRENDO DA POSS LA PEDINA E CONTROLLO IL SUO TEAM, E SE PUÒ ARRIVARE ALLA CASELLA 
            //SE SI LA CASELLA È PROTETTA ALTRIMENTI NO.
            uint[8] memory possx;
            uint[8] memory possy;
            uint[2] memory temp; 
            bool[8] memory ress;
            uint[2] memory pos = Chessboard.getKing(team);
            (ress[0], temp)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0]))), uint(Movecontroller.arrecc(int(pos[1]+1)))], team );
            possx[0] = temp[0];possy[0] = temp[1];
            (ress[1], temp)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])+1)), pos[1]], team );
            possx[1] = temp[0];possy[1] = temp[1];
            (ress[2], temp)=isEvilBox( [uint(Movecontroller.arrdec(int(pos[0])-1)), pos[1]], team );
            possx[2] = temp[0];possy[2] = temp[1];
            (ress[3], temp)=isEvilBox( [pos[0], uint(Movecontroller.arrdec(int(pos[1])-1))], team );
            possx[3] = temp[0];possy[3] = temp[1];
            (ress[4], temp)=isEvilBox( [uint(Movecontroller.arrdec(int(pos[0])-1)), uint(Movecontroller.arrdec(int(pos[1])-1))], team );
            possx[4] = temp[0];possy[4] = temp[1];
            (ress[5], temp)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])+1)), uint(Movecontroller.arrecc(int(pos[1])+1))], team );
            possx[5] = temp[0];possy[5] = temp[1];
            (ress[6], temp)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])+1)), uint(Movecontroller.arrdec(int(pos[1])-1))], team );
            possx[6] = temp[0];possy[6] = temp[1];
            (ress[7], temp)=isEvilBox( [uint(Movecontroller.arrdec(int(pos[0])-1)), uint(Movecontroller.arrecc(int(pos[1])+1))], team );
            possx[7] = temp[0];possy[7] = temp[1];

            if(ress[0]&&ress[1]&&ress[2]&&ress[3]&&ress[4]&&ress[5]&&ress[6]&&ress[7]){ return true; }
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

        posx[4] = newpos[0]+(7-Movecontroller.max(newpos[0],newpos[1]));//+x+y
        posy[4] = newpos[1]+(7-Movecontroller.max(newpos[0],newpos[1]));
        posx[5] = newpos[0]-Movecontroller.min(newpos[0],newpos[1]);//-x-y
        posy[5] = newpos[1]-Movecontroller.min(newpos[0],newpos[1]);
        posx[6] = uint(Movecontroller.arrecc(int(newpos[1])+int(newpos[0])));//+x-y
        posy[6] = uint(Movecontroller.arrdec(int(newpos[1])-(7-int(newpos[0]))));

        posx[7] = uint(Movecontroller.arrdec(int(newpos[1])-(7-int(newpos[0]))));//-x+y
        posy[7] = uint(Movecontroller.arrecc(int(newpos[1])+int(newpos[0])));

        //console.log('----------------');
        for(uint i=0; i<posx.length; i++){
            (res, pos) = Movecontroller.isObstacled(newpos, [posx[i],posy[i]]);//ok
            /*console.log('..................');
            console.logUint(posx[i]);
            console.logUint(posy[i]);*/
            (res, pos) = canArrive(newpos, [posx[i],posy[i]], team);
            if(res){
                return ( true, pos);
            }
            /*if(Movecontroller.Direction(pos, newpos)&&
               Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&
               Chessboard.getBox(pos[0],pos[1]).color!=team){
                return ( true, pos);
            }*/
        }
        return ( false, pos );
    }
    function canArrive(uint[2] memory oldpos, uint[2] memory newpos, bool team) public view returns(bool res, uint[2] memory pos){
        (res, pos) = Movecontroller.isObstacled(oldpos, newpos);//ok
        if( res&&
            Movecontroller.Direction(pos, oldpos)&&
            Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(oldpos[1])))&&
            Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[0])-int(oldpos[0])))&&
            team!=Chessboard.getBox(pos[0],pos[1]).color){
            res = true; pos;
        } else { res = false; pos; }
    }
    

    constructor(address _gamecontrol, address payable _chessboard){
        Movecontroller = MoveController(_gamecontrol);
        Chessboard = ChessBoard(_chessboard);
    }   
}










