
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
    const res = await cuentaVotos('0x0d5752D90c81373BB3E9b5D4E5B0DBc16c3801d4'); // OWNER
    console.log(res);
    porcentaje.innerHTML = `${(res/10)*100} %`;


    const reu = await cuentaVotos(accounts.REU);
    const bc = await cuentaVotos(accounts.BC);
    const tpu = await cuentaVotos(accounts.TPU);
    const nu = await cuentaVotos(accounts.NU);

    // Calcular cantidad
    // (100%, resultado, ID, )
    calcular(10-Number(res), Number(reu), 'REU');
    calcular(10-Number(res), Number(bc), 'BC');
    calcular(10-Number(res), Number(tpu), 'TPU');
    calcular(10-Number(res), Number(nu), 'NU');
  }
};

const cuentaVotos = async (addr) => {
  const app = App.contracts.Votacion;
  try {
    const res = await app.methods.valanceOf(addr).call();    
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

const calcular = (proporcion, resultado, id) => {
  proporcion = proporcion == 0 ? 1 : proporcion;
  let per = (resultado/proporcion)*100;
  const elem = document.getElementById(id);
  if(per == 0){
    elem.style.color = 'black';
    elem.style.textShadow = 'none';
    elem.innerHTML = '0 %';
    elem.style.lineHeight = '2.5em';
  }else{
    elem.innerHTML = `${parseInt(per)} %`;
    // 160 -- 100%
    // X --- per
    elem.style.height = `${(per*160)/100}px`;
  }

}

window.addEventListener('load', () => {
  console.log('INICIO de la DAPP');
  App.init();
});
