// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;
import "./ERC20.sol";
contract Votacion is ERC20Basic{
    address public owner;
    // string title;

    //votantes direcciones
    address [10] public votantes;
    
    // candidatos direcciones Cuatro candidatos
    address[4] public candidatos;

    constructor() ERC20Basic(10){
        owner = msg.sender;
        recibirCandidatos();
        recibirVotantes();
    }

    function quienEnvio() public view returns(address){
      return msg.sender;
    }
    function verCandidatos() public view returns(address [4] memory){
        return candidatos;
    }

    function asignarToken(address _votante) public returns(bool){
        //MSG.SENDER asigna tokens a los votantes (OWNER)
        // Podemos restringir que solo variable de estado OWNER sea el que asigne votos
        return approve(owner, _votante, 1);
    }

    function votar(address _candidato) public returns(bool){
        //MSG.SENDER envia su token a _candidato
        return transferFrom(owner, _candidato, 1);
    }

    function verTokenAsignado(address _votante) public view returns(uint256){
        //variable de estado OWNER es propietario quien asigna votos
        return allowance(owner, _votante);
    }

    function verVotos(address _candidato) public view returns(uint256){
        return valanceOf(_candidato);
    }

    function recibirCandidatos() private {
        candidatos[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        candidatos[1] = address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);
        candidatos[2] = address(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db);
        candidatos[3] = address(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB);
    }
    function recibirVotantes() private {
        votantes[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        votantes[1] = address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);
        votantes[2] = address(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db);
        votantes[3] = address(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB);
        votantes[4] = address(0xFf027902FE23dD09f4C38FC534aE9e107eEe7E42);
        votantes[5] = address(0xFA4d70462809B43F529FFb1DE9C077D094e6ab8a);
        votantes[6] = address(0x2bcD78720142835143819AF9b145A51F967eFbB6);
        votantes[7] = address(0xEF10f0930298674FeD4cD2d0CFcFe9D398Da1fe6);
        votantes[8] = address(0x80dC5fC8b93E46A53d0340DF43F16AE9Ff4FfCED);
    }
}