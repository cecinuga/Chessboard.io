const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Various Games.", function() {
    async function deployContracts(){
        const [player1, player2] = await ethers.getSigners();
        const Chessboard = await ethers.getContractFactory('ChessBoard');
        const Movecontroller = await ethers.getContractFactory('MoveController');
        const Movehandler = await ethers.getContractFactory('MoveHandler');
    
        const chessboard = await Chessboard.deploy(player1.address, player2.address);
        const controller = await Movecontroller.deploy(chessboard.address);
        const handler = await Movehandler.deploy(controller.address, chessboard.address);
    
        return { chessboard, controller,handler, player1, player2 }
    }
    it("Partita 1. Test 1.", async function(){
        const { chessboard, controller,handler, player1, player2 } = await loadFixture(deployContracts)
        expect(await chessboard.connect(player1).Move([2,6],[2,4])).to.be.ok;//pedone bianco mi scopro
        expect(await chessboard.connect(player2).Move([2,1],[2,3])).to.be.ok;//pedona nero
        expect(await chessboard.connect(player1).Move([7,6],[7,4])).to.be.ok;//pedone bianco
        expect(await chessboard.connect(player1).Move([6,6],[6,5])).to.be.ok;//pedone bianco
        expect(await chessboard.connect(player2).Move([3,0],[0,3])).to.be.ok;//regina nero faccio scacco
        
        //SCACCO MATTO DEL NERO!!!*/
        //ok è cicco corretto dio maiale.
        //expect(await chessboard.connect(player1).Move([3,7],[2,6])).to.be.ok;//re bianco
    });
});