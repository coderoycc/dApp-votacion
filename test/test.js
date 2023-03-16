// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Votación", function () {
    it("Prueba de Equilibrio de Saldo", async function () {
        const Votacion = await ethers.getContractFactory("contracts/ERC20.sol:ERC20Basic");
        const votacion = await Votacion.deploy("FMK",10);
        await votacion.deployed();
        console.log('Desplegado con la dirección: '+ votacion.address)
        expect((await votacion.totalSupply()).toNumber()).to.equal(10);
    });
    /*it("test updating and retrieving updated value", async function () {
        const Storage = await ethers.getContractFactory("Storage");
        const storage = await Storage.deploy();
        await storage.deployed();
        const storage2 = await ethers.getContractAt("Storage", storage.address);
        const setValue = await storage2.store(56);
        await setValue.wait();
        expect((await storage2.retrieve()).toNumber()).to.equal(56);
    });*/
});