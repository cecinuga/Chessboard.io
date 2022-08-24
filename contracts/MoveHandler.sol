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
    function checkHandler(bool team) public view 
    returns(bool resss){
        uint[2] memory king = Chessboard.getKing(team);
        bool res;bool[8] memory authres;bool[8] memory ress;uint[8] memory posx; uint[8] memory posy;
        //console.log('-----------------------');
        (res,ress,posx,posy) = isEvilBox(king, team);
        if(res){
            authres = AuthPos(team);
            console.log(authres[0]);console.log(authres[1]);console.log(authres[2]);console.log(authres[3]);console.log(authres[4]);console.log(authres[5]);console.log(authres[6]);console.log(authres[7]);          
            if(authres[0]&&authres[1]&&authres[2]&&authres[3]&&authres[4]&&authres[5]&&authres[6]&&authres[7]){
                for(uint i = 0; i<ress.length; i++){
                    //PROBLEMA: Parare tutti gli scacchi 
                    if(ress[i]){ 
                        console.log('.....................');
                        console.logUint(posx[i]);
                        console.logUint(posy[i]);
                        
                        int _x =(int(posx[i]) - int(king[0]));
                        int _y =(int(posy[i]) - int(king[1]));
                        int incx = Movecontroller.increment(_x); int incy = Movecontroller.increment(_y);
                        uint z=posx[i];uint k=posy[i];

                    }
                }
            } else { 
                //TUTT'APPPOST UAGLIO SCAPP A NAPULE TATTATA TATATAATAATATTTA
            }

            
        }
        /*for(uint i = 0; i< res.length; i++){
            if(res[i]){ 

                //Ho le posizioni delle caselle che minacciano il RE
                //Prendo le posizioni dei miei pezzi e controllo se almeno un pezzo può coprire la traiettoria 
                int _x =(int(posx[i]) - int(king[0]));
                int _y =(int(posy[i]) - int(king[1]));
                int incx = Movecontroller.increment(_x); int incy = Movecontroller.increment(_y);
                uint ii=posx[i];uint j=posy[i];

                ress = true;
                while(( ii!=uint(int(posx[i]))  ||  j!=uint(int(posy[i])) )){ 
                    ii = uint(Movecontroller.arrecc(int(ii)+(incx))); 
                    j = uint(Movecontroller.arrecc(int(j)+(incy)));
                    bool canpro;uint[2] memory propos;
                    (canpro, propos) = isEvilBox([ii,j], !team);
                    if(canpro) { prox[i]=posx[i];proy[i]=posy[i]; }
                }
                console.log('-------------------------');
                console.logUint(posx[i]);
                console.logUint(posy[i]);
            }
        }*/
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
                if(Chessboard.getBox(posx[i], posy[i]).pedina==0&&Chessboard.getBox(posx[i], posy[i]).color!=team){ 
                        (ress[i],,,)=isEvilBox( [posx[i], posy[i]], team );
                } else { ress[i] = true; }
            }
            return (ress);
        }
    
    function isEvilBox(uint[2] memory oldpos, bool team) 
        public view returns(bool res, bool[8] memory ress,uint[8] memory posx, uint[8] memory posy) {
        /*console.log('--------------------');
        console.logUint(oldpos[0]);
        console.logUint(oldpos[1]);*/
        posx[0] = 0; 
        posy[0] = oldpos[1];//-x
        posx[1] = 7; 
        posy[1] = oldpos[1];//+x
        posx[2] = oldpos[0]; //-y
        posy[2] = 0;
        posx[3] = oldpos[0]; //+y
        posy[3] = 7;

        posx[4] = oldpos[0]+(7-Movecontroller.max(oldpos[0],oldpos[1]));//+x+y
        posy[4] = oldpos[1]+(7-Movecontroller.max(oldpos[0],oldpos[1]));
        posx[5] = oldpos[0]-Movecontroller.min(oldpos[0],oldpos[1]);//-x-y
        posy[5] = oldpos[1]-Movecontroller.min(oldpos[0],oldpos[1]);
        posx[6] = uint(Movecontroller.arrecc(int(oldpos[1])+int(oldpos[0])));//+x-y
        posy[6] = uint(Movecontroller.arrdec(int(oldpos[1])-(7-int(oldpos[0]))));

        posx[7] = uint(Movecontroller.arrdec(int(oldpos[1])-(7-int(oldpos[0]))));//-x+y
        posy[7] = uint(Movecontroller.arrecc(int(oldpos[1])+int(oldpos[0])));

        //console.log('----------------');
        uint[2] memory pos; 
        for(uint i=0; i<posx.length; i++){
            /*console.log('..................');
            console.logUint(posx[i]);
            console.logUint(posy[i]);*/
            (ress[i], pos) = canArriveToMe(oldpos, [posx[i],posy[i]], team);
            if(ress[i]){
                posx[i] = pos[0];
                posy[i] = pos[1];
            }
        }
        if(ress[0]||ress[1]||ress[2]||ress[3]||ress[4]||ress[5]||ress[6]||ress[7]){ res=true; }
        else{ res=false; }
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










