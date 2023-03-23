
const App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    await App.initWeb3();
    await App.initContract();
    await App.bindEvents();
    
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

  bindEvents: async function () {

    const porcentaje = document.getElementById('porcentaje');
    const res = await obtenerPorcentaje();
    console.log(res);
    console.log();
    porcentaje.innerHTML = `${(res/10)*100} %`;
    
    var x = document.getElementById('REU');
    
    x.innerHTML='100%';
    x.style.height = '5px';

    const reu = cuentaVotos('');
    const bc = cuentaVotos('');
    const tpu = cuentaVotos('');
    const nu = cuentaVotos('');

  }
};

const obtenerPorcentaje = async () => {
  const app = App.contracts.Votacion;
  try {
    const own = "0x0d5752D90c81373BB3E9b5D4E5B0DBc16c3801d4";
    const res = await app.methods.valanceOf(own).call();    
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

const cuentaVotos = async () => {
  console.log("-");
}

window.addEventListener('load', () => {
  console.log('INICIO de la DAPP');
  App.init();
  console.log(App.contracts.Votacion);
});
