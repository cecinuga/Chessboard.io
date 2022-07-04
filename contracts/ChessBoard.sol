//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;
import './MoveController.sol';
import './MoveHandler.sol';
import 'hardhat/console.sol';
/*
    Creare le eccezioni per:        
        [!]Randomicità tra colori, 
        [!!!]Gestione del Tempo,
*/
contract ChessBoard {
    uint public totalPrize;
    address private turner;
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
    mapping(bool => address) private players;
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

    function isNotEvilBox(uint[2] memory newpos, bool team) public view returns(bool res) { { bool resEvilBox; uint[2] memory evilbox; (resEvilBox, evilbox)=Movehandler.isEvilBox(newpos, team); if(!resEvilBox){ res=true; } else{ res=false; }}}//LOGICAMENTE COLLAUDATO
    function setKing(uint[2] memory pos) internal { kingpos[teams[msg.sender]] = pos; }
    modifier isSetKing(uint[2] memory oldpos, uint[2] memory newpos) { 
        if(  Chessboard[oldpos[0]][oldpos[1]].pedina==5  ){ 
            require(isNotEvilBox(newpos, teams[msg.sender]),'');
            setKing(newpos);
        }_;
    }  
    
    function setCheck(bool _check) private { check[!teams[msg.sender]]=_check; }
    modifier isSetCheck(uint[2] memory newpos){ 
        bool obs;(obs, ) = Movecontroller.isObstacled(newpos, kingpos[!teams[msg.sender]]);
        if(  Movecontroller.Direction(newpos, kingpos[!teams[msg.sender]])&&obs  ){ 
            setCheck(true);
        }_;
    }
    modifier PedestrianToQueen(uint[2] memory oldpos, uint[2] memory newpos){
        if(teams[msg.sender]&&Chessboard[oldpos[0]][oldpos[1]].pedina==1&&newpos[0]==0){ Chessboard[oldpos[0]][oldpos[1]].pedina=6; }
        else if(!teams[msg.sender]&&Chessboard[oldpos[0]][oldpos[1]].pedina==1&&newpos[0]==7){ Chessboard[oldpos[0]][oldpos[1]].pedina=6; }
        _;
    }

    function getPlayer(bool team) public view /*onlyPlayers*/ returns(address _player) { _player = players[team]; }
    function getTeam(address _player) public view /*onlyPlayers*/ returns(bool team){ team=teams[_player]; }
    function getRules(uint pedina) public view /*onlySpot*/ returns(_Rules memory rule){ rule = Rules[pedina]; }
    function getBox(uint i, uint j) public view returns(Box memory box){ box = Chessboard[i][j]; }
    function getKing(bool team) public view returns(uint[2] memory pos){ pos = kingpos[team]; }
    function getCheck(bool _player) public view returns(bool res){ res = check[_player];}

    function Move(uint[2] memory oldpos, uint[2] memory newpos) public
        onlyYPayYPlay(teams[msg.sender])
        onlyPlayers /*yourTurn*/ 
        Movecontrol(oldpos, newpos) 
        PedestrianToQueen(oldpos, newpos)
        isSetKing(oldpos, newpos)
        isSetCheck(oldpos)
        returns(bool res){
            bool isArrocco = false;
            
            if(oldpos[0]==0&&oldpos[1]==4&&Chessboard[0][4].pedina==5&&!KingsFirstmove[false]  ){
                if( newpos[0]==oldpos[0]&&newpos[1]==oldpos[1]+2&&Chessboard[0][7].pedina==2&&!TowersFirstmove[false][true] ){
                    Chessboard[oldpos[0]][oldpos[1]] = Box(0, false);
                    Chessboard[oldpos[0]][oldpos[1]+2] = Box(5, false);
                    Chessboard[oldpos[0]][oldpos[1]+1] = Box(2, false);
                    isArrocco=true;
                }
                else if( newpos[0]==oldpos[0]&&newpos[1]==oldpos[1]-2&&Chessboard[0][0].pedina==2&&!TowersFirstmove[false][false] ){
                    Chessboard[oldpos[0]][oldpos[1]] = Box(0, false);
                    Chessboard[oldpos[0]][oldpos[1]-2] = Box(5, false);
                    Chessboard[oldpos[0]][oldpos[1]-1] = Box(2, false);
                    isArrocco=true;
                }
                
            }
            else if(oldpos[0]==7&&oldpos[1]==3&&Chessboard[7][3].pedina==5&&!KingsFirstmove[true]){
                if( newpos[0]==oldpos[0]&&newpos[1]==oldpos[1]+2&&Chessboard[7][7].pedina==2&&!TowersFirstmove[true][true] ){
                    Chessboard[oldpos[0]][oldpos[1]] = Box(0, true);
                    Chessboard[oldpos[0]][oldpos[1]+2] = Box(5, true);
                    Chessboard[oldpos[0]][oldpos[1]+1] = Box(2, true);
                    isArrocco=true;

                }
                else if( newpos[0]==oldpos[0]&&newpos[1]==oldpos[1]-2&&Chessboard[7][0].pedina==2&&!TowersFirstmove[true][false] ){
                    Chessboard[oldpos[0]][oldpos[1]] = Box(0, true);
                    Chessboard[oldpos[0]][oldpos[1]-2] = Box(5, true);
                    Chessboard[oldpos[0]][oldpos[1]-1] = Box(2, true);                    
                    isArrocco=true;
                }
            }   
            bool ischeck;bool nopos;
            (ischeck, nopos) = Movehandler.isCheckMate(teams[msg.sender]);
            if(ischeck&&nopos){ 
                if(msg.sender==players[true]) { selfdestruct(payable(players[false])); }
                else if(msg.sender==players[false]) { selfdestruct(payable(players[true])); }
            }
            else if(!ischeck&&!nopos&&!isArrocco){
                Chessboard[newpos[0]][newpos[1]] = Chessboard[oldpos[0]][oldpos[1]];
                Chessboard[oldpos[0]][oldpos[1]] = Box(0, false);
                turner = players[!teams[msg.sender]];
            }
            else if(!ischeck&&nopos){ 
                if(msg.sender==players[true]) { payable(players[false]).transfer(prizes[players[false]]); }
                else if(msg.sender==players[false]) {  payable(players[true]).transfer(prizes[players[true]]); }
                selfdestruct(payable(players[true]));
            }

            if(  Chessboard[oldpos[0]][oldpos[1]].pedina==5  ){ KingsFirstmove[teams[msg.sender]]=true; }
            if(Chessboard[oldpos[0]][oldpos[1]].pedina==2){
                if( (oldpos[0]==0&&oldpos[1]==0)&&teams[msg.sender] ){ TowersFirstmove[teams[msg.sender]][true] = true; }
                else if( (oldpos[0]==0&&oldpos[1]==7)&&teams[msg.sender] ){ TowersFirstmove[teams[msg.sender]][false] = true; }

                if( (oldpos[0]==7&&oldpos[1]==0)&&!teams[msg.sender] ){ TowersFirstmove[teams[msg.sender]][true] = true; }
                else if( (oldpos[0]==7&&oldpos[1]==7)&&!teams[msg.sender] ){ TowersFirstmove[teams[msg.sender]][false] = true; }
            }
            res = true;
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

        kingpos[teams[players[true]]] = [7,3];
        kingpos[teams[players[false]]] = [0,4]; 

        check[teams[players[true]]] = false;
        check[teams[players[false]]] = false;

        KingsFirstmove[teams[players[true]]] = false;
        KingsFirstmove[teams[players[false]]] = false;
        TowersFirstmove[teams[players[true]]][false] = false;
        TowersFirstmove[teams[players[true]]][true] = false;
        TowersFirstmove[teams[players[false]]][false] = false;
        TowersFirstmove[teams[players[false]]][true] = false;

        Rules[0] = _Rules([false, false, false], 0);//NULL
        Rules[1] = _Rules([true, false, false], 1);//PEDONE
        Rules[2] = _Rules([true, true, false], 8);//TORRE
        Rules[3] = _Rules([false, false, false], 4);//CAVALLO
        Rules[4] = _Rules([false, false, true], 8);//ALFIERE
        Rules[5] = _Rules([true, true, true], 1);//RE
        Rules[6] = _Rules([true, true, true], 8);//REGINA

        Chessboard[0][0] = Box(2, false);
        Chessboard[0][1] = Box(3, false);
        Chessboard[0][2] = Box(4, false);
        Chessboard[0][3] = Box(6, false);
        Chessboard[0][4] = Box(5, false);
        Chessboard[0][5] = Box(4, false);
        Chessboard[0][6] = Box(3, false);
        Chessboard[0][7] = Box(2, false);

        Chessboard[1][0] = Box(1, false);
        Chessboard[1][1] = Box(1, false);
        Chessboard[1][2] = Box(1, false);
        Chessboard[1][3] = Box(1, false);
        Chessboard[1][4] = Box(1, false);
        Chessboard[1][5] = Box(1, false);
        Chessboard[1][6] = Box(1, false);
        Chessboard[1][7] = Box(1, false);

        Chessboard[6][0] = Box(1, true);
        Chessboard[6][1] = Box(1, true);
        Chessboard[6][2] = Box(1, true);
        Chessboard[6][3] = Box(1, true);
        Chessboard[6][4] = Box(1, true);
        Chessboard[6][5] = Box(1, true);
        Chessboard[6][6] = Box(1, true);
        Chessboard[6][7] = Box(1, true);
    
        Chessboard[7][0] = Box(2, true);
        Chessboard[7][1] = Box(3, true);
        Chessboard[7][2] = Box(4, true);
        Chessboard[7][3] = Box(5, true);
        Chessboard[7][4] = Box(6, true);
        Chessboard[7][5] = Box(4, true);
        Chessboard[7][6] = Box(3, true);
        Chessboard[7][7] = Box(2, true);

        //TESTING MOCHA TOGLIERE DAL CAZZO
        Chessboard[5][5] = Box(1, true);
        Chessboard[5][1] = Box(1, true);
        Chessboard[5][3] = Box(2, true);
        Chessboard[4][3] = Box(2, true);
        Chessboard[2][6] = Box(2, true);

        Chessboard[7][7] = Box(4,true);
        Chessboard[6][6] = Box(0,false);

        Chessboard[1][4] = Box(2,false);
        Chessboard[3][4] = Box(0,false);
        Chessboard[3][5] = Box(0,false);
        Chessboard[3][6] = Box(2,false);

        Chessboard[5][1] = Box(1, true);
        Chessboard[3][0] = Box(1, false);

        Chessboard[6][5] = Box(1, false);
        Chessboard[1][5] = Box(1, true);

        Chessboard[7][5] = Box(0, false);
        Chessboard[0][5] = Box(0, false);

        Chessboard[0][1] = Box(0, false);
        Chessboard[0][2] = Box(0, false);
        Chessboard[0][3] = Box(0, false);
        Chessboard[0][5] = Box(0, false);
        Chessboard[0][6] = Box(0, false);
        //TESTING MOCHA TOGLIERE DAL CAZZO
    }
    receive() external payable onlyPlayers{
        prizes[msg.sender] = msg.value;
        totalPrize+=msg.value;
        if(prizes[players[true]]>0 && prizes[players[false]]>0){
            //START GAME
        }
    }
} 