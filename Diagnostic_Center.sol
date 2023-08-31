// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract DiagnosticContract {
    struct diagCenter {
        address diagCenterId;
        string name;
        string license;
    }

    mapping(address => diagCenter) public centerList;

    function addCenter(string memory _name, string memory _license) external {
        centerList[msg.sender] = diagCenter(msg.sender, _name, _license);
    }

    function getCenter(
        address _diagCenterId
    ) public view returns (diagCenter memory) {
        return centerList[_diagCenterId];
    }
}
