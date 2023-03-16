// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;
import "./SafeMath.sol";

//Direcciones
//Pedro --> 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
//pablo --> 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
//René --> 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
//Javier --> 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB  (PROPIETARIO)
//Interface de nuestro token erc20
interface IERC20{
    //Devuelve la cantidad de tokens en existencia
    function totalSupply() external view returns(uint256);

    //Devuelve la cantidad de tokens para una dirección como parametro
    function valanceOf(address account) external view returns(uint256);

    //devuelve el número de token que el spender(que tiene potestad de gastar) puede gastar  en nombre del propietario
    function allowance(address owner, address spender) external view returns(uint256); 

    //Devuelve un valor booleano resultado de una operacion indicada
    function transfer(address recipient, uint256 amount) external returns(bool);

    //devuelve un valor booleano con el resultado de la operacion de gasto
    function approve(address spender, uint256 amount) external returns(bool);

    //devuelve un valor booleano con el resultado de la operacion de paso de una cantidad de tokens usando el metodo allowance()
    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);    

    //evento que se debe emitir cuando una cantidad de tokens pasen de un origen a un destino
    event Transfer(address indexed from, address indexed to, uint256 amount);

    //evento que se debe emitir cuando se establece una asignacion con el metodo allowance()
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


//implementacion de las funciones del token ERC20
contract ERC20Basic is IERC20{
    string public constant name = "TKV";
    uint8 public constant decimals = 2;

    //event Transfer(address indexed from, address indexed to, uint256 tokens);
    //event Approval(address indexed owner, address indexed spender, uint256 tokens);

    using SafeMath for uint256;

    mapping (address => uint) balances; //propietario de tokens
    mapping (address => mapping (address => uint)) allowed; //propietario y a las direcciones que está cedido
    uint256 totalSupply_; //Variable global de todos los tokens

    //Origen de la criptomoneda (Token)
    constructor (uint256 initialSupply){
        totalSupply_ = initialSupply;
        balances[msg.sender]=totalSupply_;
    }

    //Misma funcion de la interface, pero publica para acceder desde afuera y override para poder editarla
    function totalSupply() public override view returns(uint256){
        return totalSupply_;
    }

    function increaseTotalSupply(uint newTokensAmount) public {
        totalSupply_ += newTokensAmount;
        balances[msg.sender] += newTokensAmount;
        //LOs tokens totales crecen y se los asigna al que los minó
    }

    function valanceOf(address tokenOwner) public override view returns(uint256){
        return balances[tokenOwner];
    }

    function allowance(address owner, address delegate) public override view returns(uint256){
        return allowed[owner][delegate];
        //retorna cuanto tiene asignado un delegado para gastar
    }

    function transfer(address recipient, uint256 numTokens) public override returns(bool){
        require (numTokens <= balances[msg.sender], "No tienes esa cantidad");
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[recipient] = balances[recipient].add(numTokens);
        emit Transfer(msg.sender, recipient, numTokens);
        return true;
    }

    // (MSG.SENDER) ASIGNA 'N' TOKENS A UN DELEGADO 
    function approve(address delegate, uint256 numTokens) public override returns(bool){
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns(bool){
        require(balances[owner] > numTokens, "No dispones de esa cantidad");
        require(numTokens <= allowed[owner][msg.sender], "No tienes asignada esa cantidad");
        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        //Alguien compra tokens, pero por un intermediario DELEGATE (msg.sender) que puede vender los tokens que se le asigno en caso de tener los suficientes
        return true;
    }
}