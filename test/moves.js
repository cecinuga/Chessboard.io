const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Various Moves.", function() {
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
    it("isEvilBox Test 1.", async function(){
        const { chessboard, controller,handler, player1, player2 } = await loadFixture(deployContracts)
        expect(await chessboard.connect(player1).Move([2,6],[2,4])).to.be.not.reverted//pedone bianco 
        expect(await chessboard.connect(player2).Move([3,1],[3,3])).to.be.not.reverted//pedona nero
        expect(await chessboard.connect(player1).Move([7,6],[7,4])).to.be.not.reverted//pedone bianco
        expect(await chessboard.connect(player2).Move([4,0],[0,4])).to.be.not.reverted//regina nero

        //console.log(await handler.isEvilBox([2,6], true));

        //await expect(chessboard.connect(player1).Move([3,7],[2,6])).to.be.revertedWith('kingonevilbox');//re bianco
    });
});