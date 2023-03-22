
const App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // await App.initWeb3();
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
  },

  initContract: async function () {
    // fetch('../../build/contracts/Votacion.json')
    // .then(response => response.json())
    // .then(data => {
    //   const contractABI = data.abi;
    //   const address = data.networks['5777'].address
    //   console.log(contractABI);
    //   App.contracts.Votacion = new web3.eth.Contract(
    //     contractABI,
    //     address
    //   );  
    // })
    // .catch(error => console.error(error));

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
    const conn = document.getElementById('btn-eth');
    let app = App.contracts.Votacion;
    conn.addEventListener('click', verificaConn);
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
    App.initWeb3();
    console.log('No esta conectado');
  }
}

window.addEventListener('load', () => {
  console.log('INICIO de la DAPP');
  App.init();
  console.log(App.contracts.Votacion);
});
