
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
    const prueba = document.getElementById('btn');
    const quien = document.getElementById('quien');
    const conn = document.getElementById('conectar');
    const asignar = document.getElementById('asignar');
    const ver = document.getElementById('ver');
    const saldo = document.getElementById('saldo');
    const approve = document.getElementById('approve');
    let app = App.contracts.Votacion;
    let own;
    prueba.addEventListener('click', async () => {
      try {
        own = await app.methods.owner().call();
        console.log(own);
        // const own = await app.owner();
        // console.log(own, "\nEs el propietario");
      } catch (error) {
        console.log(error);
        console.log('********** ERROR');
      }
    })
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
    asignar.addEventListener('click', async () => {
      try {
        const addr = window.ethereum.selectedAddress;
        const res = await app.methods.asignarToken(addr).send({ from: addr });
        
        console.log(res);
      } catch (error) {
        console.log("NO SE ASIGNO");
        console.log(error);
      }  
    });
    ver.addEventListener('click', async ()=>{
      try {
        const addr = window.ethereum.selectedAddress;
        const res = await app.methods.verTokenAsignado(addr).call({ from: addr})
        console.log(res);
      } catch (error) {
        console.log(error);
        console.log('ERROR VER TOKEN');
      }
    })
    saldo.addEventListener('click', async ()=>{
      try {
        console.log(app);
        const own = await app.methods.owner().call();
        console.log("PROPIETARIO: ",own);
        const res = await app.methods.valanceOf(window.ethereum.selectedAddress).call((error, respuesta)=> {
          if(error){
            console.log(error);
          }else{
            console.log(respuesta, "\n*********");
          }
        })
        return 0;
      } catch (error) {
        console.log(error);
      }
    })
    approve.addEventListener('click', async () => {
      try {
        console.log('USO DE APPROVE');
        const own = await app.methods.owner().call();
        console.log(own);
        const a = await app.methods.approve(own, window.ethereum.selectedAddress, 1).send({ from: own })
        console.log(a);
        
        const r = await app.methods.allowance(own, window.ethereum.selectedAddress).send({ from: own});
        console.log("ASIGNADO: ",r);
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
