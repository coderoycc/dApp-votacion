
const App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    await App.initWeb3();
    await App.initContract();
    App.bindEvents();
  },

  initWeb3: async function () {
    if (typeof window.ethereum !== 'undefined') {
      App.web3Provider = window.ethereum;
      try {
        // Interación con metamask
        await window.ethereum.enable();
      } catch (error) {
        console.error("SIN ACCESO A METAMASK");
      }
    } else if (typeof web3 !== 'undefined') {
      // Usamos un proveedor externo predeterminado
      App.web3Provider = web3.currentProvider;
    } else {
      // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      console.log("NO HAY PROVEEDOREEEEEEEEEEEEEES\n*******************************************");
    }
    web3 = new Web3(App.web3Provider);
    // return App.initContract();
  },

  initContract: async function () {
    try {
      const response = await fetch('../../build/contracts/Votacion.json');
      const data = await response.json();
      const contractABI = data.abi;
      // const key = Object.keys(data.networks).pop();
      const address = data.networks['5777'].address;
      console.log('Desplegado en la direccion: ', address);
      App.contracts.Votacion = new web3.eth.Contract(contractABI, address);
    } catch (err) {
      console.log(err);
    }
  },

  bindEvents: function () {
    
    const quien = document.getElementById('quien');
    const conn = document.getElementById('btn-eth');
    const ver = document.getElementById('ver');
    const votar = document.getElementById('votar');
    const saldo = document.getElementById('saldo');
    let app = App.contracts.Votacion;

    quien.addEventListener('click', async () => {
      try {
        const add = window.ethereum.selectedAddress;
        
        const res = await app.methods.quienEnvio().call({ from: add });
        console.log(res);
        
      } catch (error) {
        console.log(error);
        console.log("******ERROR ENVIO");
      }
    })
    conn.addEventListener('click', verificaConn);
    
    const voto = async (addr) => {
      try {
        const res = await app.methods.votar(addr).send({ from: window.ethereum.selectedAddress });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    ver.addEventListener('click', async ()=>{
      try {
        const addr = window.ethereum.selectedAddress;
        const res = await app.methods.verTokenAsignado(addr).call({ from: addr})
        console.log(res);
      } catch (error) {
        console.log(error);
        console.log('ERROR VER TOKEN');
      }
    });
    votar.addEventListener('click', async () => {
      const addr = "0x0A8D90D500CB1E55a57fDcBB6450177e938d6D0e";
      voto(addr);
    });
    saldo.addEventListener('click', async ()=>{
      const addr = "0x0d5752D90c81373BB3E9b5D4E5B0DBc16c3801d4";
      try {
        const res = await app.methods.valanceOf(addr).call();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })

  }
};

const verificaConn = () => {
  if (window.ethereum.selectedAddress != null) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Estás Conectado',
      showConfirmButton: false,
      timer: 1500
    })
  } else {
    ethereum.request({ method: 'eth_requestAccounts' })
    console.log('No esta conectado');
  }
}

window.addEventListener('load', () => {
  console.log('INICIO de la DAPP');
  App.init()
});
