const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe('Directions.', function(){
  async function deployContracts(){
    const [player1, player2] = await ethers.getSigners();
    const Chessboard = await ethers.getContractFactory('ChessBoard');
    const Movecontroller = await ethers.getContractFactory('MoveController');

    const chessboard = await Chessboard.deploy(player1.address, player2.address);
    const controller = await Movecontroller.deploy(chessboard.address);

    return { chessboard, controller, player1, player2 }
  }

  it("Pedestrian Directions", async () => {
    const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)
    
    expect(await controller.Direction([0,6],[0,5])).to.equal(true);//pedone
    expect(await controller.Direction([0,6],[1,5])).to.equal(false);//pedone
  });
  it("Tower Directions", async () => {
    const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)
    
    expect(await controller.Direction([7,7],[5,7])).to.equal(true);
    expect(await controller.Direction([7,7],[7,5])).to.equal(true);
    expect(await controller.Direction([7,7],[5,5])).to.equal(false);
  });
  it("Bishop Directions", async () => {
    const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)

    expect(await controller.Direction([2,0],[4,2])).to.equal(true);
    expect(await controller.Direction([2,0],[0,2])).to.equal(true);
    expect(await controller.Direction([2,0],[2,5])).to.equal(false);
  });
  it("Horse Directions", async () => {
    const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)

    expect(await controller.Direction([1,0],[3,1])).to.equal(true);
    expect(await controller.Direction([1,0],[0,2])).to.equal(true);
  });
  it("Queen Directions", async () => {
    const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)

    expect(await controller.Direction([3,0],[3,1])).to.equal(true);
    expect(await controller.Direction([3,0],[4,1])).to.equal(true);
    expect(await controller.Direction([3,0],[2,1])).to.equal(true);
  });
  it("King Directions", async () => {
    const { chessboard, controller, player1, player2 } = await loadFixture(deployContracts)

    expect(await controller.Direction([4,0],[4,2])).to.equal(true);
    expect(await controller.Direction([4,0],[3,1])).to.equal(true);
    expect(await controller.Direction([4,0],[3,0])).to.equal(true);
  });
});