var Votacion = artifacts.require('./Votacion.sol');

contract("Votacion", (cuentas) => {
  var app;
  
  it("TotalSupply", async ()=>{
    app = await Votacion.deployed();
    const total = await app.totalSupply();
    const totalNum = parseInt(total.toString());
    assert.equal(totalNum, 10);
  })
})