# PROTOTIPO DE APLICACIÓN DESCENTRALIZADA 
## ASPECTOS RESALTANTES
* Esta dApp está realizada con una blockchain local (ganache)
* Con el entorno de desarrollo Truffle
* Contratos inteligentes bajo lenguaje **Solidity**
## REQUERIMIENTOS PARA EJECUTAR
* Debe tener instalado Ganache (dektop o cli)
* Debe tener instalado NODE - NPM
* En un navegador debe tener la extensión de MetaMask (<a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es" target="_blank">PARA GOOGLE</a>)
## DEPLOY DEL PROROTIPO DAPP
* En consola después de clonar el repositorio, ejecutar `npm install`.
* También Ejecutar `truffle deploy`
* Al finalizar ejecutar `truffle migrate --reset` para que el contrato inteligente migre a la blockchain (local). 
* En Los archivos de JavaScript apartado de "cuentas" modificar con las cuentas de su red local GANACHE. Cada uno donde corresponde 'OWN' es el propietario (con la cuenta con la que se despliega el contrato).

* Para asignar tokens a los votantes se usa la consola de truffle usando el siguiente comando `truffle console`
* El contrato inteligente desplegado se recupera con `const app = await Votacion.deployed()`.
* Ahora usamos el método para asignar tokens a las cuentas de nueustra red (ganache).
* Ejecutamos `await app.asignarToken(direccion)`
* En lugar de 'direccion' se pone la dirección a la que se asigna el token '0x6df2...'.
* Después de seguir todos los pasos, puede ejecutar la aplicación con el servidor web local de su preferencia. 
