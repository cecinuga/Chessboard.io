const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Mates.", function(){
    async function deployContracts(){
        const [player1, player2] = await ethers.getSigners();
        const Chessboard = await ethers.getContractFactory('ChessBoard');
        const Movecontroller = await ethers.getContractFactory('MoveController');
        const Movehandler = await ethers.getContractFactory('MoveHandler');

        const chessboard = await Chessboard.deploy(player1.address, player2.address);
        const controller = await Movecontroller.deploy(chessboard.address);
        const handler = await Movehandler.deploy(controller.address, chessboard.address);

        return { chessboard, controller, handler, player1, player2 }
    }
    it('CheckMate Barbiere.', async function(){
        const { chessboard, controller,handler, player1, player2 } = await loadFixture(deployContracts)

    });
});