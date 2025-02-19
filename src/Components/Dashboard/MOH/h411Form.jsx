// src/components/PHIExtendedForm.js
import React, { useState } from 'react';

export default function PHIExtendedForm({ patientId, onSubmit }) {
  const [phiData, setPhiData] = useState({
    phiReferenceNo: '',
    mohNotificationNo: '',
    phiRegisterNo: '',
    phiRanga: '',
    mohArea: '',
    diseaseAsNotified: '',
    diseaseAsNotifiedDate: '',
    diseaseConfirm: '',
    diseaseConfirmDate: '',
    nameOfPatient: '',
    address: '',
    age: '',
    sex: '',
    ethnicGroup: '',
    dateOfOnset: '',
    dateOfHospitalization: '',
    dateOfDischarge: '',
    nameOfHospital: '',
    outcome: '',
    whereIsolated: '',
    natureOfCase: '',
    oneCaseInOutbreak: '',
    patientsMovements: '',
    laboratoryFindings: '',
  });

  const handlePhiChange = (e) => {
    const { name, value } = e.target;
    setPhiData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(phiData).includes('')) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit(phiData);
  };

  return (
    <div className="w-2/3 p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-4">Extended P.H.I Form for Patient {patientId}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
            Visit (Patient ID)
          </label>
          <input
            type="text"
            id="patientId"
            value={patientId || ''}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div>
          <label htmlFor="phiReferenceNo" className="block text-sm font-medium text-gray-700">
            P.H.I Reference No
          </label>
          <input
            type="text"
            id="phiReferenceNo"
            placeholder="Enter P.H.I Reference Number"
            value={phiData.phiReferenceNo}
            onChange={handlePhiChange}
            name="phiReferenceNo"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="mohNotificationNo" className="block text-sm font-medium text-gray-700">
            M.O.H. Notification No
          </label>
          <input
            type="text"
            id="mohNotificationNo"
            placeholder="Enter M.O.H. Notification Number"
            value={phiData.mohNotificationNo}
            onChange={handlePhiChange}
            name="mohNotificationNo"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="phiRegisterNo" className="block text-sm font-medium text-gray-700">
            P.H.I. Register No
          </label>
          <input
            type="text"
            id="phiRegisterNo"
            placeholder="Enter P.H.I. Register Number"
            value={phiData.phiRegisterNo}
            onChange={handlePhiChange}
            name="phiRegisterNo"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="phiRanga" className="block text-sm font-medium text-gray-700">
            P.H.I. Ranga
          </label>
          <input
            type="text"
            id="phiRanga"
            placeholder="Enter P.H.I. Ranga"
            value={phiData.phiRanga}
            onChange={handlePhiChange}
            name="phiRanga"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="mohArea" className="block text-sm font-medium text-gray-700">
            M.O.H. Area
          </label>
          <input
            type="text"
            id="mohArea"
            placeholder="Enter M.O.H. Area"
            value={phiData.mohArea}
            onChange={handlePhiChange}
            name="mohArea"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="diseaseAsNotified" className="block text-sm font-medium text-gray-700">
            Disease as Notified
          </label>
          <input
            type="text"
            id="diseaseAsNotified"
            placeholder="Enter Disease as Notified"
            value={phiData.diseaseAsNotified}
            onChange={handlePhiChange}
            name="diseaseAsNotified"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="diseaseAsNotifiedDate" className="block text-sm font-medium text-gray-700">
            Date of Disease Notified
          </label>
          <input
            type="date"
            id="diseaseAsNotifiedDate"
            value={phiData.diseaseAsNotifiedDate}
            onChange={handlePhiChange}
            name="diseaseAsNotifiedDate"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="diseaseConfirm" className="block text-sm font-medium text-gray-700">
            Disease Confirmed
          </label>
          <input
            type="text"
            id="diseaseConfirm"
            placeholder="Enter Disease Confirmed"
            value={phiData.diseaseConfirm}
            onChange={handlePhiChange}
            name="diseaseConfirm"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="diseaseConfirmDate" className="block text-sm font-medium text-gray-700">
            Date of Disease Confirmation
          </label>
          <input
            type="date"
            id="diseaseConfirmDate"
            value={phiData.diseaseConfirmDate}
            onChange={handlePhiChange}
            name="diseaseConfirmDate"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="nameOfPatient" className="block text-sm font-medium text-gray-700">
            Name of Patient
          </label>
          <input
            type="text"
            id="nameOfPatient"
            placeholder="Enter Name of Patient"
            value={phiData.nameOfPatient}
            onChange={handlePhiChange}
            name="nameOfPatient"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={phiData.address}
            onChange={handlePhiChange}
            name="address"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            placeholder="Enter Age"
            value={phiData.age}
            onChange={handlePhiChange}
            name="age"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
            Sex
          </label>
          <select
            id="sex"
            value={phiData.sex}
            onChange={handlePhiChange}
            name="sex"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="ethnicGroup" className="block text-sm font-medium text-gray-700">
            Ethnic Group
          </label>
          <select
            id="ethnicGroup"
            value={phiData.ethnicGroup}
            onChange={handlePhiChange}
            name="ethnicGroup"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select Ethnic Group</option>
            <option value="Sinhalese">Sinhalese</option>
            <option value="Tamil">Tamil</option>
            <option value="Muslim">Muslim</option>
            <option value="Burgher">Burgher</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateOfOnset" className="block text-sm font-medium text-gray-700">
            Date of Onset
          </label>
          <input
            type="date"
            id="dateOfOnset"
            value={phiData.dateOfOnset}
            onChange={handlePhiChange}
            name="dateOfOnset"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="dateOfHospitalization" className="block text-sm font-medium text-gray-700">
            Date of Hospitalization
          </label>
          <input
            type="date"
            id="dateOfHospitalization"
            value={phiData.dateOfHospitalization}
            onChange={handlePhiChange}
            name="dateOfHospitalization"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="dateOfDischarge" className="block text-sm font-medium text-gray-700">
            Date of Discharge
          </label>
          <input
            type="date"
            id="dateOfDischarge"
            value={phiData.dateOfDischarge}
            onChange={handlePhiChange}
            name="dateOfDischarge"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="nameOfHospital" className="block text-sm font-medium text-gray-700">
            Name of Hospital
          </label>
          <input
            type="text"
            id="nameOfHospital"
            placeholder="Enter Name of Hospital"
            value={phiData.nameOfHospital}
            onChange={handlePhiChange}
            name="nameOfHospital"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="outcome" className="block text-sm font-medium text-gray-700">
            Outcome
          </label>
          <select
            id="outcome"
            value={phiData.outcome}
            onChange={handlePhiChange}
            name="outcome"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select Outcome</option>
            <option value="Recovered">Recovered</option>
            <option value="Died">Died</option>
          </select>
        </div>

        <div>
          <label htmlFor="whereIsolated" className="block text-sm font-medium text-gray-700">
            Where Isolated
          </label>
          <select
            id="whereIsolated"
            value={phiData.whereIsolated}
            onChange={handlePhiChange}
            name="whereIsolated"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select Isolation Status</option>
            <option value="Home">Home</option>
            <option value="Hospital">Hospital</option>
            <option value="Not isolated">Not isolated</option>
          </select>
        </div>

        <div>
          <label htmlFor="natureOfCase" className="block text-sm font-medium text-gray-700">
            Nature of Case
          </label>
          <input
            type="text"
            id="natureOfCase"
            placeholder="Enter Nature of Case"
            value={phiData.natureOfCase}
            onChange={handlePhiChange}
            name="natureOfCase"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="oneCaseInOutbreak" className="block text-sm font-medium text-gray-700">
            One Case in Outbreak
          </label>
          <input
            type="text"
            id="oneCaseInOutbreak"
            placeholder="Enter if One Case in Outbreak"
            value={phiData.oneCaseInOutbreak}
            onChange={handlePhiChange}
            name="oneCaseInOutbreak"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="patientsMovements" className="block text-sm font-medium text-gray-700">
            Patient's Movements
          </label>
          <input
            type="text"
            id="patientsMovements"
            placeholder="Enter Patient's Movements"
            value={phiData.patientsMovements}
            onChange={handlePhiChange}
            name="patientsMovements"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="laboratoryFindings" className="block text-sm font-medium text-gray-700">
            Laboratory Findings
          </label>
          <input
            type="text"
            id="laboratoryFindings"
            placeholder="Enter Laboratory Findings"
            value={phiData.laboratoryFindings}
            onChange={handlePhiChange}
            name="laboratoryFindings"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Submit P.H.I Extended Form
      </button>
    </div>
  );
}
