const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Various Moves.", function() {
    async function deployContracts(){
        const [player1, player2] = await ethers.getSigners();
        const Chessboard = await ethers.getContractFactory('ChessBoard');
        const Movecontroller = await ethers.getContractFactory('MoveController');
    
        const chessboard = await Chessboard.deploy(player1.address, player2.address);
        const controller = await Movecontroller.deploy(chessboard.address);
    
        return { chessboard, controller, player1, player2 }
    }
    it("Pedestrian [1,6],[1,3]", async function(){
        const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)
        const tx = await chessboard.Move([1,6],[1,3])
        tx.wait();
        console.log(tx)
    })
});