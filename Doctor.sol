// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract DoctorContract {
    struct Doctor {
        address doctorId;
        string name;
        string license;
    }

    mapping(address => Doctor) public doctorList;

    function addDoctor(string memory _name, string memory _license) external {
        doctorList[msg.sender] = Doctor(msg.sender, _name, _license);
    }

    function getDoctor(address _doctorId) public view returns (Doctor memory) {
        return doctorList[_doctorId];
    }
}
