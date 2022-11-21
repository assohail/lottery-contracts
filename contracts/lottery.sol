// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// abstract contract Lotters {
//     address public manager;
//     address[] public play;
//     address public winner;
//     function enterLotter() virtual public pure; 
//     function pickWinner() virtual public view returns (address);
// }

//add player's balance to the conrtract
contract Lottery {
    address public manager;
    address[] public players;
    address payable public winner;
    mapping (address => uint) private random;


    constructor () {
        manager = msg.sender;
    }

    function enterLotter() public payable {
        require(msg.value > 0.01 ether, "Value should be greater than 0.01");
        players.push(msg.sender);
    }
    
    function pickWinner() public restricted returns (address) {
        uint arrLength = players.length;
        uint randomNumber = random[msg.sender] % arrLength;
        winner = payable(players[randomNumber]);
        winner.transfer(address(this).balance);
        players = new address[](0);
        return winner;
    }

    modifier restricted() {
        require(msg.sender == manager && players.length > 0, "Only Contract Owner Can Pick the WINNER");
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    // keccak not working in remix
    // function sudoRandom() public view returns (uint){
        // uint a;
        // a = uint(keccak256(block.difficulty, now, players));
    //    return a;
    // }
}