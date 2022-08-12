const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } = require('bignumber.js')

describe("Obstacles.", function() {
    async function deployContracts(){
        const [player1, player2] = await ethers.getSigners();
        const Chessboard = await ethers.getContractFactory('ChessBoard');
        const Movecontroller = await ethers.getContractFactory('MoveController');
    
        const chessboard = await Chessboard.deploy(player1.address, player2.address);
        const controller = await Movecontroller.deploy(chessboard.address);
    
        return { chessboard, controller, player1, player2 }
    }
    it('Any Obstacles', async () => {
        const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)

        const x = new BigNumber(0x00);const y = new BigNumber(0x01)
        const res = await controller.isObstacled([0,0],[0,5])
        expect(res[0]).to.equal(false)

        const res1 = await controller.isObstacled([0,0],[0,1])
        expect(res1[0]).to.equal(true)

        const res2 = await controller.isObstacled([0,1],[0,2])
        expect(res2[0]).to.equal(true)
    });
    
});