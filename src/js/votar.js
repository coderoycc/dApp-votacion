
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
    const conn = document.getElementById('btn-eth');
    conn.addEventListener('click', verificaConn);
    const voto = async (addr) => {
      try {
        const res = await app.methods.votar(addr).send({ from: window.ethereum.selectedAddress });
        console.log(res);
        if(res){
          alertaVotoRegistrado();
        }
      } catch (error) {
        console.log(error);
      }
    }
    let app = App.contracts.Votacion;
    document.getElementById('reu').addEventListener('click', async () => {
      try {
        const addr = window.ethereum.selectedAddress;
        const res = await app.methods.verTokenAsignado(addr).call({ from: addr})
        if(res != 0){
          voto(accounts.REU);
        }else{
          throw new Error('Ya voto');
        }
      } catch (error) {
        alertaYaVoto();
        console.log(error);
      }
    })
    
    document.getElementById('nu').addEventListener('click', async () => {
      try {
        const addr = window.ethereum.selectedAddress;
        const res = await app.methods.verTokenAsignado(addr).call({ from: addr})
        if(res != 0){
          voto(accounts.NU);
        }else{
          throw new Error('Ya voto');
        }
      } catch (error) {
        alertaYaVoto();
        console.log(error);
      }
    })

    document.getElementById('tpu').addEventListener('click', async () => {
      try {
        const addr = window.ethereum.selectedAddress;
        const res = await app.methods.verTokenAsignado(addr).call({ from: addr})
        if(res != 0){
          voto(accounts.TPU);
        }else{
          throw new Error('Ya voto');
        }
      } catch (error) {
        alertaYaVoto();
        console.log(error);
      }
    })

    document.getElementById('bc').addEventListener('click', async () => {
      try {
        const addr = window.ethereum.selectedAddress;
        const res = await app.methods.verTokenAsignado(addr).call({ from: addr})
        if(res != 0){
          voto(accounts.BC);
        }else{
          throw new Error('Ya voto');
        }
      } catch (error) {
        alertaYaVoto();
        console.log(error);
      }
    })


  }
};

const verificaConn = () => {
  if (window.ethereum.selectedAddress != null ) {
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

const alertaYaVoto = () => {
  Swal.fire({
    icon: 'error',
    title: 'Usted ya votó',
    text: 'Su token asignado ya fue usado',
    footer: '<a href="">¿Se trata de un error?</a>',
    width: '35em'
  })
}
const alertaVotoRegistrado = () =>{
  Swal.fire({
    position: 'center', //top-end
    icon: 'success',
    title: 'Voto registrado',
    showConfirmButton: false,
    timer: 1500 //1500
  });
}
window.addEventListener('load', () => {
  console.log('INICIO de la DAPP');
  App.init()
});