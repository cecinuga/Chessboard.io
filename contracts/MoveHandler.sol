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
    struct EvilBoxs{
        bool res;
        bool[8] ress;
        uint[8] posx;
        uint[8] posy;
    }

    modifier onlyYourChessboard{require(msg.sender==address(Chessboard),'!c');_;}
    modifier onlyYourController{require(msg.sender==address(Movecontroller),'!m');_;}
    function checkHandler(bool team, bool authres) public view 
    returns(bool){
        bool[8] memory prot;
        uint checks = 0;
        uint[2] memory king = Chessboard.getKing(team);
        EvilBoxs memory protected;
        for(uint i=0; i<protected.ress.length; i++){ protected.ress[i]=false; }
        //console.log('-----------------------');
        if(isEvilBox(king, team).res&&authres){
            for(uint i = 0; i<isEvilBox(king, team).ress.length; i++){
                if(isEvilBox(king, team).ress[i]){ 
                    checks++;
                    int _x =(int(isEvilBox(king, team).posx[i]) - int(king[0]));
                    int _y =(int(isEvilBox(king, team).posy[i]) - int(king[1]));
                    int incx = Movecontroller.increment(_x); int incy = Movecontroller.increment(_y);
                    uint z=king[0];uint k=king[1];
                    while(( z!=uint(int(isEvilBox(king, team).posx[i]))  ||  k!=uint(int(isEvilBox(king, team).posy[i])) )){ 
                        z = uint(Movecontroller.arrecc(int(z)+(incx))); 
                        k = uint(Movecontroller.arrecc(int(k)+(incy)));
                        protected = isEvilBox([z,k], !team);
                        for(uint m = 0; m<protected.ress.length; m++){ 
                            /*console.log('....................');
                            console.logUint(z);
                            console.logUint(k);
                            console.log(protected.ress[m]);
                            console.logUint(protected.posx[m]);
                            console.logUint(protected.posy[m]);*/
                            if(protected.ress[m]&&Chessboard.getBox(protected.posx[m], protected.posy[m]).pedina!=5){ 
                                prot[i]=true;             
                                break; 
                            }
                        }
                        if(prot[i]) break;
                    }
                } else { prot[i]=true; }
            }
            //console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
            //console.log(prot[0]);console.log(prot[1]);console.log(prot[2]);console.log(prot[3]);console.log(prot[4]);console.log(prot[5]);console.log(prot[6]);console.log(prot[7]);
            //console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
            if(checks<2&&prot[0]&&prot[1]&&prot[2]&&prot[3]&&prot[4]&&prot[5]&&prot[6]&&prot[7]){ return true; }
            else{ return false; }
        }
        else { 
                //TUTT'APPPOST UAGLIO SCAPP A NAPULE TATTATA TATATAATAATATTTA
                return true;
        }
    } 
    
    function AuthPos(bool team)
        public view onlyYourChessboard returns(bool[8] memory ress){
            /*console.log('pos');
            console.logUint(pos[0]);console.logUint(pos[1]);*/
            //PRENDO DA POSS LA PEDINA E CONTROLLO IL SUO TEAM, E SE PUÒ ARRIVARE ALLA CASELLA 
            //SE SI LA CASELLA È PROTETTA ALTRIMENTI NO.
            uint[2] memory pos = Chessboard.getKing(team);
            uint[8] memory posx;uint[8] memory posy;
            posx[0] = uint(Movecontroller.arrecc(int(pos[0])));
            posy[0] = uint(Movecontroller.arrecc(int(pos[1])+1));
            posx[1] = uint(Movecontroller.arrecc(int(pos[0])+1));
            posy[1] = uint(Movecontroller.arrecc(int(pos[1])));
            posx[2] = uint(Movecontroller.arrecc(int(pos[0])));
            posy[2] = uint(Movecontroller.arrdec(int(pos[1])-1));
            posx[3] = uint(Movecontroller.arrdec(int(pos[0])-1));
            posy[3] = uint(Movecontroller.arrecc(int(pos[1])));
            posx[4] = uint(Movecontroller.arrecc(int(pos[0])+1));
            posy[4] = uint(Movecontroller.arrdec(int(pos[1])-1));
            posx[5] = uint(Movecontroller.arrdec(int(pos[0])-1));
            posy[5] = uint(Movecontroller.arrecc(int(pos[1])+1));
            posx[6] = uint(Movecontroller.arrdec(int(pos[0])-1));
            posy[6] = uint(Movecontroller.arrdec(int(pos[1])-1));
            posx[7] = uint(Movecontroller.arrecc(int(pos[0])+1));
            posy[7] = uint(Movecontroller.arrecc(int(pos[1])+1));

            for(uint i = 0; i < posx.length; i++){
                if(Chessboard.getBox(posx[i], posy[i]).pedina!=0&&Chessboard.getBox(posx[i], posy[i]).color==team){
                   ress[i] = true;//occupato da un amico
                } else {  ress[i]=isEvilBox( [posx[i], posy[i]], team ).res; }
            }
            return (ress);
        }
    
    function isEvilBox(uint[2] memory oldpos, bool team) 
        public view returns(EvilBoxs memory evilboxs) {
        /*console.log('--------------------');
        console.logUint(oldpos[0]);
        console.logUint(oldpos[1]);*/
        evilboxs.posx[0] = 0; 
        evilboxs.posy[0] = oldpos[1];//-x
        evilboxs.posx[1] = 7; 
        evilboxs.posy[1] = oldpos[1];//+x
        evilboxs.posx[2] = oldpos[0]; //-y
        evilboxs.posy[2] = 0;
        evilboxs.posx[3] = oldpos[0]; //+y
        evilboxs.posy[3] = 7;

        evilboxs.posx[4] = oldpos[0]+(7-Movecontroller.max(oldpos[0],oldpos[1]));//+x+y
        evilboxs.posy[4] = oldpos[1]+(7-Movecontroller.max(oldpos[0],oldpos[1]));
        evilboxs.posx[5] = oldpos[0]-Movecontroller.min(oldpos[0],oldpos[1]);//-x-y
        evilboxs.posy[5] = oldpos[1]-Movecontroller.min(oldpos[0],oldpos[1]);
        evilboxs.posx[6] = uint(Movecontroller.arrecc(int(oldpos[1])+int(oldpos[0])));//+x-y
        evilboxs.posy[6] = uint(Movecontroller.arrdec(int(oldpos[1])-(7-int(oldpos[0]))));

        evilboxs.posx[7] = uint(Movecontroller.arrdec(int(oldpos[1])-(7-int(oldpos[0]))));//-x+y
        evilboxs.posy[7] = uint(Movecontroller.arrecc(int(oldpos[1])+int(oldpos[0])));

        //console.log('----------------');
        uint[2] memory pos; 
        for(uint i=0; i<evilboxs.posx.length; i++){
            /*console.log('..................');
            console.logUint(evilboxs.posx[i]);
            console.logUint(evilboxs.posy[i]);*/

            (evilboxs.ress[i], pos) = canArriveToMe(oldpos, [evilboxs.posx[i],evilboxs.posy[i]], team);
            if(evilboxs.ress[i]){
                evilboxs.posx[i] = pos[0];
                evilboxs.posy[i] = pos[1];
            }
        }
        if(evilboxs.ress[0]||evilboxs.ress[1]||evilboxs.ress[2]||evilboxs.ress[3]||evilboxs.ress[4]||evilboxs.ress[5]||evilboxs.ress[6]||evilboxs.ress[7]){ evilboxs.res=true; }
        else{ evilboxs.res=false; }
    }
    function canArriveToMe(uint[2] memory oldpos, uint[2] memory newpos, bool team) public view returns(bool res, uint[2] memory pos){
        (res, pos) = Movecontroller.isObstacled(oldpos, newpos);//ok
        if( Chessboard.getBox(pos[0], pos[1]).pedina!=0&&
            Movecontroller.Direction(pos, oldpos)&&
            Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(oldpos[1])-int(pos[1])))&&
            Chessboard.getRules(Chessboard.getBox(pos[0], pos[1]).pedina).maxsteps>=uint(Movecontroller.abs(int(oldpos[0])-int(pos[0])))&&
            team!=Chessboard.getBox(pos[0],pos[1]).color){
            res = true;
        } else { res = false; }
    }
    

    constructor(address _gamecontrol, address payable _chessboard){
        Movecontroller = MoveController(_gamecontrol);
        Chessboard = ChessBoard(_chessboard);
    }   
}










