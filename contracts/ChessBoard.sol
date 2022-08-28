//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;
import './MoveController.sol';
import './MoveHandler.sol';
import "hardhat/console.sol";

/*
    Creare le eccezioni per:        
        [!]Randomicità tra colori, 
        [!!!]Gestione del Tempo,
*/
contract ChessBoard {
    uint public totalPrize;
    address private turner;
    address public winner;
    struct _Rules{
        bool[3] moves_directions;
        uint maxsteps;
    }
    struct Box { 
        uint pedina;
        bool color;
    }
    mapping(uint => _Rules) Rules;
    mapping(bool => uint[2]) private kingpos;
    mapping(bool => bool) public KingsFirstmove;
    mapping(bool => mapping(bool => bool)) public TowersFirstmove;
    mapping(bool => bool) public check;
    mapping(address => bool) private teams;
    mapping(bool => address) public players;
    mapping(address => uint) public prizes;
    Box[8][8] private Chessboard;
    MoveController public Movecontroller;
    MoveHandler public Movehandler;

    modifier onlyYPayYPlay(bool team){ require(prizes[players[team]]>=prizes[players[!team]]-0.002 ether&&prizes[players[team]]<=prizes[players[!team]]+0.002 ether);_; }
    modifier onlySpot{ require(msg.sender==players[true]||msg.sender==players[false]||msg.sender==address(Movehandler)||msg.sender==address(Movecontroller),'');_;}
    modifier onlyPlayers{ require(msg.sender==players[true]||msg.sender==players[false],''); _; }
    modifier onlyMoveHandler{ require(msg.sender==address(Movehandler),'');_; }
    modifier onlyMoveController{ require(msg.sender==address(Movecontroller),'');_; }
    //modifier yourTurn{ require(msg.sender==turner);_; }
    modifier Movecontrol(uint[2] memory oldpos, uint[2] memory newpos){ require(Movecontroller.MoveControl(oldpos, newpos, teams[msg.sender], Rules[Chessboard[oldpos[0]][oldpos[1]].pedina].maxsteps),''); _; }
    modifier PedestrianToQueen(uint[2] memory oldpos, uint[2] memory newpos){
        if(teams[msg.sender]&&Chessboard[oldpos[0]][oldpos[1]].pedina==1&&newpos[1]==0){ Chessboard[oldpos[0]][oldpos[1]].pedina=6; }
        else if(!teams[msg.sender]&&Chessboard[oldpos[0]][oldpos[1]].pedina==1&&newpos[1]==7){ Chessboard[oldpos[0]][oldpos[1]].pedina=6; }
        _;
    }
    function setKing(uint[2] memory pos) internal { kingpos[teams[msg.sender]] = pos; KingsFirstmove[teams[msg.sender]]=false; }

    function setCheck(bool _check, bool team) private { check[team]=_check; }
    function isSetCheck(uint[2] memory newpos) private { 
        bool arr;(arr, ) = Movehandler.canArriveToMe(newpos, kingpos[!teams[msg.sender]], teams[msg.sender]);
        if(  arr  ){ 
            setCheck(true, !teams[msg.sender]);
        }
    }
    function setTowers(uint[2] memory pos) private {
        if(Chessboard[pos[0]][pos[1]].pedina==2){
            if(pos[0]==0) TowersFirstmove[teams[msg.sender]][false] = false;
            else if(pos[0]==7) TowersFirstmove[teams[msg.sender]][true] = false;

        }
    }

    function getPlayer(bool team) public view returns(address _player) { _player = players[team]; }
    function getTeam(address _player) public view /*onlyPlayers*/ returns(bool team){ team=teams[_player]; }
    function getRules(uint pedina) public view /*onlySpot*/ returns(_Rules memory rule){ rule = Rules[pedina]; }
    function getBox(uint i, uint j) public view returns(Box memory box){ box = Chessboard[i][j]; }
    function getKing(bool team) public view returns(uint[2] memory pos){ pos = kingpos[team]; }
    function getCheck(bool _player) public view returns(bool res){ res = check[_player];}

    function Move(uint[2] memory oldpos, uint[2] memory newpos) public
        /*onlyYPayYPlay(teams[msg.sender])*/
        onlyPlayers /*yourTurn*/ 
        Movecontrol(oldpos, newpos) 
        PedestrianToQueen(oldpos, newpos)
        returns(bool res){
            if(Chessboard[oldpos[0]][oldpos[1]].pedina==5){ setKing(newpos); }
            Chessboard[newpos[0]][newpos[1]] = Chessboard[oldpos[0]][oldpos[1]];
            Chessboard[oldpos[0]][oldpos[1]] = Box(0, false);
            
            bool[8] memory authress = Movehandler.AuthPos(!teams[msg.sender]);bool authres;
            //console.log('--------------------------');
            for(uint kk =0; kk<authress.length; kk++){
                //console.log(authress[kk]);
            }
            if(authress[0]&&authress[1]&&authress[2]&&authress[3]&&authress[4]&&authress[5]&&authress[6]&&authress[7]){ 
                authres = true;
            } else { authres = false; }
            
            bool evilbox; 
            evilbox = Movehandler.isEvilBox(kingpos[teams[msg.sender]], teams[msg.sender]).res;
            require(!evilbox,'kingonevilbox');

            bool checkhandler = Movehandler.checkHandler(!teams[msg.sender], authres);    
            //console.log('!!!!!!!!!!!!!!!!!!!!!!!');
            //console.log(checkhandler);
            bool[8] memory nomoreposs = Movehandler.AuthPos(teams[msg.sender]);bool nomorepos;
            if(nomoreposs[0]&&nomoreposs[1]&&nomoreposs[2]&&nomoreposs[3]&&nomoreposs[4]&&nomoreposs[5]&&nomoreposs[6]&&nomoreposs[7]){ 
                nomorepos = true;
            } else { nomorepos = false; }
            if(checkhandler){ 
                setCheck(false, teams[msg.sender]);
                isSetCheck(newpos);
                setTowers(oldpos);
                res = true;
            } else if(nomorepos&&!getCheck(!teams[msg.sender])){
                //Stallo Bro
                res = false;
            } else if(!checkhandler){
                //SCACCO MATTO BRO!
                console.log('Scacco Matto! Ho vinto!');
            }
        }

    constructor(address _player1, address _player2) {
        Movecontroller = new MoveController(payable(address(this)));
        Movehandler = new MoveHandler(address(Movecontroller), payable(address(this)));

        players[true] = _player1;
        players[false] = _player2;
        turner = _player1; //Turno
        //Inserire Randomicità
        teams[players[true]] = true;
        teams[players[false]] = false;

        kingpos[teams[players[true]]] = [3,7];
        kingpos[teams[players[false]]] = [3,0]; 

        check[teams[players[true]]] = false;
        check[teams[players[false]]] = false;

        KingsFirstmove[teams[players[true]]] = true;
        KingsFirstmove[teams[players[false]]] = true;
        TowersFirstmove[teams[players[true]]][false] = true;
        TowersFirstmove[teams[players[true]]][true] = true;
        TowersFirstmove[teams[players[false]]][false] = true;
        TowersFirstmove[teams[players[false]]][true] = true;

        Rules[0] = _Rules([false, false, false], 0);//NULL
        Rules[1] = _Rules([false, true, false], 1);//PEDONE
        Rules[2] = _Rules([true, true, false], 7);//TORRE
        Rules[3] = _Rules([false, false, false], 4);//CAVALLO
        Rules[4] = _Rules([false, false, true], 7);//ALFIERE
        Rules[5] = _Rules([true, true, true], 1);//RE
        Rules[6] = _Rules([true, true, true], 7);//REGINA

        Chessboard[0][0] = Box(2, false);
        Chessboard[1][0] = Box(3, false);
        Chessboard[2][0] = Box(4, false);
        Chessboard[3][0] = Box(5, false);
        Chessboard[4][0] = Box(6, false);
        Chessboard[5][0] = Box(4, false);
        Chessboard[6][0] = Box(3, false);
        Chessboard[7][0] = Box(2, false);

        Chessboard[0][1] = Box(1, false);
        Chessboard[1][1] = Box(1, false);
        Chessboard[2][1] = Box(1, false);
        Chessboard[3][1] = Box(1, false);
        Chessboard[4][1] = Box(1, false);
        Chessboard[5][1] = Box(1, false);
        Chessboard[6][1] = Box(1, false);
        Chessboard[7][1] = Box(1, false);

        Chessboard[0][6] = Box(1, true);
        Chessboard[1][6] = Box(1, true);
        Chessboard[2][6] = Box(1, true);
        Chessboard[3][6] = Box(1, true);
        Chessboard[4][6] = Box(1, true);
        Chessboard[5][6] = Box(1, true);
        Chessboard[6][6] = Box(1, true);
        Chessboard[7][6] = Box(1, true);
    
        Chessboard[0][7] = Box(2, true);
        Chessboard[1][7] = Box(3, true);
        Chessboard[2][7] = Box(4, true);
        Chessboard[3][7] = Box(5, true);
        Chessboard[4][7] = Box(6, true);
        Chessboard[5][7] = Box(4, true);
        Chessboard[6][7] = Box(3, true);
        Chessboard[7][7] = Box(2, true); 

        /*TESTING */
        
    }
    receive() external payable onlyPlayers{
        prizes[msg.sender] = msg.value;
        totalPrize+=msg.value;
    }
} 