// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Patient.sol";
import "./Doctor.sol";
import "./Diagnostic_Center.sol";

contract HealthRecord {
    struct PatientRecord {
        address patientID;
        address doctorID;
        string date;
        string diagnosedWith;
        string bloodPressure;
        string pulseRate;
        string drug;
        string unit;
        string thingsToFollow;
    }

    struct DiagnosticReport {
        address patientID;
        address diagnosticCenterID;
        string contentID;
        string date;
    }

    mapping(address => PatientRecord[]) private patientRecords;
    mapping(address => DiagnosticReport[]) private patientReports;

    PatientContract public patientContract;
    DoctorContract public doctorContract;
    DiagnosticContract public diagContract;

    constructor(
        address _doctorContract,
        address _patientContract,
        address _diagContract
    ) {
        patientContract = PatientContract(_patientContract);
        doctorContract = DoctorContract(_doctorContract);
        diagContract = DiagnosticContract(_diagContract);
    }

    modifier onlyDoctor() {
        DoctorContract.Doctor memory doctor = doctorContract.getDoctor(
            msg.sender
        );
        require(
            doctor.doctorId != address(0),
            "Only registered doctors can access"
        );
        _;
    }

    modifier validPatient(address _patientID) {
        PatientContract.Patient memory patient = patientContract.getPatient(
            _patientID
        );
        require(patient.patientId != address(0), "Patient not found");
        _;
    }

    modifier onlyDiagnosticCenter() {
        DiagnosticContract.diagCenter memory diagCenter = diagContract
            .getCenter(msg.sender);
        require(diagCenter.diagCenterId != address(0), "Patient not found");
        _;
    }

    function healthRecordStore(
        address _patientID,
        string memory _date,
        string memory _diagnosedWith,
        string memory _bloodPressure,
        string memory _pulseRate,
        string memory _drug,
        string memory _unit,
        string memory _thingsToFollow
    ) public onlyDoctor validPatient(_patientID) {
        PatientRecord memory newRecord = PatientRecord(
            _patientID,
            msg.sender,
            _date,
            _diagnosedWith,
            _bloodPressure,
            _pulseRate,
            _drug,
            _unit,
            _thingsToFollow
        );
        patientRecords[_patientID].push(newRecord);
    }

    function diagnosticReportStore(
        address _patientID,
        string memory _contentID,
        string memory _date
    ) public onlyDiagnosticCenter validPatient(_patientID) {
        DiagnosticReport memory newReport = DiagnosticReport(
            _patientID,
            msg.sender,
            _contentID,
            _date
        );

        patientReports[_patientID].push(newReport);
    }

    function healthRecordGet() public view returns (PatientRecord[] memory) {
        return patientRecords[msg.sender];
    }

    function healthReportGet() public view returns (DiagnosticReport[] memory) {
        return patientReports[msg.sender];
    }
}
