const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Modder.", function() {
    async function deployContracts(){
        const [player1, player2] = await ethers.getSigners();
        const Chessboard = await ethers.getContractFactory('ChessBoard');
        const Movecontroller = await ethers.getContractFactory('MoveController');
    
        const chessboard = await Chessboard.deploy(player1.address, player2.address);
        const controller = await Movecontroller.deploy(chessboard.address);
    
        return { chessboard, controller, player1, player2 }
    }
    it("Pedestrian can fly.", async function() {
        const { controller } = await loadFixture(deployContracts)

        await controller.MoveControl([1,6],[1,5],true,1)
        //expect(await controller.MoveControl([1,1],[1,3],false,1)).to.equal({})
    });
});