// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SOLSTOKEN is ERC20, ERC20Burnable, Ownable {

    constructor() ERC20("SOLSTOKEN", "SOLT") {
        _mint(0x1E77C8CEF83bb5332248891b1174140cC68Ce092, 10000000000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }
}