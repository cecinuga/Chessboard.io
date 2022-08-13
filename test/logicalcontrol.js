const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } = require('bignumber.js')

describe("Logical Control.", function() {
    async function deployContracts(){
        const [player1, player2] = await ethers.getSigners();
        const Chessboard = await ethers.getContractFactory('ChessBoard');
        const Movecontroller = await ethers.getContractFactory('MoveController');
    
        const chessboard = await Chessboard.deploy(player1.address, player2.address);
        const controller = await Movecontroller.deploy(chessboard.address);
    
        return { chessboard, controller, player1, player2 }
    }
    /*it('isArrocco', async () => {
        const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)
        
        await controller.MoveControl([4,0], [6,0], false, 1)
        expect(await controller.maxsteps).to.equal(2)

        await controller.MoveControl([4,0], [2,0], false, 1)
        expect(await controller.maxsteps).to.equal(2)

        await controller.MoveControl([3,7], [1,7], false, 1)
        expect(await controller.maxsteps).to.equal(2)

        await controller.MoveControl([3,7], [5,7], false, 1)
        expect(await controller.maxsteps).to.equal(2)
    });*/
});