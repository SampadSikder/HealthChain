// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract PatientContract {
    struct Patient {
        address patientId;
        string name;
        string nid;
        string dob;
    }

    mapping(address => Patient) public patientList;

    function addPatient(
        string memory _name,
        string memory _nid,
        string memory _dob
    ) external {
        patientList[msg.sender] = Patient(msg.sender, _name, _nid, _dob);
    }

    function getPatient(
        address _patientId
    ) public view returns (Patient memory) {
        return patientList[_patientId];
    }
}
