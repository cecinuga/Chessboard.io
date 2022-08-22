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
    } 

    function NoMorePos(bool team)
        public view onlyYourChessboard returns(bool){
            /*console.log('pos');
            console.logUint(pos[0]);console.logUint(pos[1]);*/
            //PRENDO DA POSS LA PEDINA E CONTROLLO IL SUO TEAM, E SE PUÒ ARRIVARE ALLA CASELLA 
            //SE SI LA CASELLA È PROTETTA ALTRIMENTI NO.
            uint[2] memory poss;
            bool[8] memory ress;
            uint[2] memory pos = Chessboard.getKing(team);
            uint x = uint(Movecontroller.abs(int(poss[0])-int(pos[0])));
            uint y = uint(Movecontroller.abs(int(poss[1])-int(pos[1])));
            for(uint i = 0; i<ress.length; i++){
                (ress[i], poss)=isEvilBox( [uint(Movecontroller.arrecc(int(pos[0])+1)), pos[1]], team );
                if(!ress[i]||( Chessboard.getBox(poss[0],poss[1]).pedina!=0&&Chessboard.getBox(poss[0],poss[1]).color==team&&Movecontroller.Direction(poss, pos) )&&x<=Chessboard.getRules(Chessboard.getBox(poss[0], poss[1]).pedina).maxsteps&&y<=Chessboard.getRules(Chessboard.getBox(poss[0], poss[1]).pedina).maxsteps  ){
                    ress[i]=false;
                } else if(ress[i]){ ress[i]=true; }
            }

            if(ress[0]&&ress[1]&&ress[2]&&ress[3]&&ress[4]&&ress[5]&&ress[6]&&ress[7]){ return false; }
            return true;
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
            if(Movecontroller.Direction(pos, newpos)&&
               Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(pos[1])-int(newpos[1])))&&
               Chessboard.getBox(pos[0],pos[1]).color!=team){
                return ( true, pos);
            }
        }
        return ( false, pos );
    }
    

    constructor(address _gamecontrol, address payable _chessboard){
        Movecontroller = MoveController(_gamecontrol);
        Chessboard = ChessBoard(_chessboard);
    }   
}










