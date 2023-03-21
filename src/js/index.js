var t1 = document.getElementById("t-1");
var t2 = document.getElementById("t-2");
var t3 = document.getElementById("t-3");
var t4 = document.getElementById("t-4");
var addr = document.getElementById('addr');

async function getTransactions() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
  );
  const blockNumber = await web3.eth.getBlockNumber();
  const n = 4;
  const latestBlocks = await Promise.all(
    [...Array(n).keys()].map((i) => web3.eth.getBlock(blockNumber - i))
  );

  const transactions = latestBlocks.map((block) => {
    return {
      hash: block.hash,
      parentHash: block.parentHash,
      transactionsRoot: block.transactionsRoot,
      timestamp: block.timestamp,
      transactions: block.transactions,
    };
  });
  let mes = {
    0: "ENE",
    1: "FEB",
    2: "MAR",
    3: "ABR",
    4: "MAY",
    5: "JUN",
    6: "JUL",
    7: "AGO",
  };
  let t = 0;
  let divsTime = document.getElementsByClassName("time");
  let divsHead = document.getElementsByClassName('events-heading');
  let divsParr = document.getElementsByClassName('par-text');
  for (const [indice, x] of transactions.entries()) {
    t = x.timestamp;
    let fecha = new Date(t * 1000);
    divsTime[indice].textContent = `${mes[fecha.getMonth()]} ${
      fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate()
    }  ${fecha.getHours()}:${fecha.getMinutes()}`;
    divsHead[indice].textContent = `HASH: ${x.hash.substr(0,8)}...${x.hash.substr(58,66)}`;
    divsParr[indice].textContent = `Parent-Hash: ${x.parentHash.substr(0,10)}...${x.parentHash.substr(56,66)}`;
  }
  // console.log(transactions);
}

const direccionContrato = async () => {
  try {
    const response = await fetch('../../build/contracts/Votacion.json');
    const data = await response.json();
    const address = data.networks['5777'].address;
    addr.innerHTML = `Contrato: ${address.substr(0,17)}...`;
  } catch (err) {
    console.log(err);
  }
}
getTransactions();
direccionContrato();