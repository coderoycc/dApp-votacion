// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;
import "./ERC20.sol";
contract Votacion is ERC20Basic{
    address public owner;
    // string title;

    //votantes direcciones
    address [] votantes;
    
    // candidatos direcciones Cuatro candidatos
    address[4] public candidatos;

    constructor() ERC20Basic(10){
        owner = msg.sender;
        candidatos[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        candidatos[1] = address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);
        candidatos[2] = address(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db);
        candidatos[3] = address(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB);
    }

    function verCandidatos() public view returns(address [4] memory){
        return candidatos;
    }

    function asignarToken(address _votante) public returns(bool){
        //MSG.SENDER asigna tokens a los votantes (OWNER)
        // Podemos restringir que solo variable de estado OWNER sea el que asigne votos
        return approve(_votante, 1);
    }

    function votar(address _candidato) public returns(bool){
        //MSG.SENDER envia su token a _candidato
        return transfer(_candidato, 1);
    }

    function verTokenAsignado(address _votante) public view returns(uint256){
        //variable de estado OWNER es propietario quien asigna votos
        return allowance(owner, _votante);
    }

    function verVotos(address _candidato) public view returns(uint256){
        return valanceOf(_candidato);
    }

}