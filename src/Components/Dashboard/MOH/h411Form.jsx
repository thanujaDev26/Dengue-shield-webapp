// src/components/PHIExtendedForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function PHIExtendedForm({ patientId, onSubmit }) {
  const [phiData, setPhiData] = useState({
    phiReferenceNo: '',
    mohNotificationNo: '',
    phiRegisterNo: '',
    phiRange: '',
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

  const navigate = useNavigate(); // Initialize useNavigate

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

  // Handle back button
  const handleBack = () => {
    navigate('/dashboard'); // Navigate back to the dashboard or any other route
  };

  return (
    <div>
      <div className="justify-items-center">
        <div className="w-2/3 items-center p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
          <h2 className="text-2xl text-center font-bold mb-20">P.H.I Form for Patient {patientId}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
            <div>
              <label htmlFor="phiReferenceNo" className="block text-sm mt-2 font-medium text-gray-700">P.H.I Reference No</label>
              <input
                type="text"
                placeholder="Enter P.H.I Reference Number"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="phiReferenceNo"
                name="phiReferenceNo"
                value={phiData.phiReferenceNo}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="mohNotificationNo" className="block text-sm mt-2 font-medium text-gray-700">M.O.H. Notification No</label>
              <input
                type="text"
                placeholder="Enter M.O.H. Notification Number"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="mohNotificationNo"
                name="mohNotificationNo"
                value={phiData.mohNotificationNo}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="phiRegisterNo" className="block text-sm mt-2 font-medium text-gray-700">P.H.I. Register No</label>
              <input
                type="text"
                placeholder="Enter P.H.I. Register Number"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="phiRegisterNo"
                name="phiRegisterNo"
                value={phiData.phiRegisterNo}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="phiRange" className="block text-sm mt-2 font-medium text-gray-700">P.H.I. Range</label>
              <input
                type="text"
                placeholder="Enter P.H.I. Range"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="phiRange"
                name="phiRange"
                value={phiData.phiRange}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="mohArea" className="block text-sm mt-2 font-medium text-gray-700">M.O.H. Area</label>
              <input
                type="text"
                placeholder="Enter M.O.H. Area"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="mohArea"
                name="mohArea"
                value={phiData.mohArea}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="diseaseAsNotified" className="block text-sm mt-2 font-medium text-gray-700">Disease as Notified</label>
              <input
                type="text"
                placeholder="Enter Disease as Notified"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="diseaseAsNotified"
                name="diseaseAsNotified"
                value={phiData.diseaseAsNotified}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="diseaseAsNotifiedDate" className="block text-sm mt-2 font-medium text-gray-700">Date of Disease Notified</label>
              <input
                type="date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="diseaseAsNotifiedDate"
                name="diseaseAsNotifiedDate"
                value={phiData.diseaseAsNotifiedDate}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="diseaseConfirm" className="block text-sm mt-2 font-medium text-gray-700">Disease Confirmed</label>
              <input
                type="text"
                placeholder="Enter Disease Confirmed"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="diseaseConfirm"
                name="diseaseConfirm"
                value={phiData.diseaseConfirm}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="diseaseConfirmDate" className="block text-sm mt-2 font-medium text-gray-700">Date of Disease Confirmation</label>
              <input
                type="date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="diseaseConfirmDate"
                name="diseaseConfirmDate"
                value={phiData.diseaseConfirmDate}
                onChange={handlePhiChange}
              />
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Patient's Details</h2>
            <hr className="my-4 border-t-2 border-gray-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
            <div>
              <label htmlFor="nameOfPatient" className="block text-sm mt-2 font-medium text-gray-700">Name of Patient</label>
              <input
                type="text"
                placeholder="Enter Name of Patient"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="nameOfPatient"
                name="nameOfPatient"
                value={phiData.nameOfPatient}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm mt-2 font-medium text-gray-700">Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="address"
                name="address"
                value={phiData.address}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm mt-2 font-medium text-gray-700">Age</label>
              <input
                type="number"
                placeholder="Enter Age"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="age"
                name="age"
                value={phiData.age}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="sex" className="block text-sm mt-2 font-medium text-gray-700">Sex</label>
              <select
                id="sex"
                name="sex"
                value={phiData.sex}
                onChange={handlePhiChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="ethnicGroup" className="block text-sm mt-2 font-medium text-gray-700">Ethnic Group</label>
              <select
                id="ethnicGroup"
                name="ethnicGroup"
                value={phiData.ethnicGroup}
                onChange={handlePhiChange}
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
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Disease Information</h2>
            <hr className="my-4 border-t-2 border-gray-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
            <div>
              <label htmlFor="dateOfOnset" className="block text-sm mt-2 font-medium text-gray-700">Date of Onset</label>
              <input
                type="date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="dateOfOnset"
                name="dateOfOnset"
                value={phiData.dateOfOnset}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="dateOfHospitalization" className="block text-sm mt-2 font-medium text-gray-700">Date of Hospitalization</label>
              <input
                type="date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="dateOfHospitalization"
                name="dateOfHospitalization"
                value={phiData.dateOfHospitalization}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="dateOfDischarge" className="block text-sm mt-2 font-medium text-gray-700">Date of Discharge</label>
              <input
                type="date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="dateOfDischarge"
                name="dateOfDischarge"
                value={phiData.dateOfDischarge}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="nameOfHospital" className="block text-sm mt-2 font-medium text-gray-700">Name of Hospital</label>
              <input
                type="text"
                placeholder="Enter Name of Hospital"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="nameOfHospital"
                name="nameOfHospital"
                value={phiData.nameOfHospital}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="outcome" className="block text-sm mt-2 font-medium text-gray-700">Outcome</label>
              <select
                id="outcome"
                name="outcome"
                value={phiData.outcome}
                onChange={handlePhiChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              >
                <option value="">Select Outcome</option>
                <option value="Recovered">Recovered</option>
                <option value="Died">Died</option>
              </select>
            </div>
            <div>
              <label htmlFor="whereIsolated" className="block text-sm mt-2 font-medium text-gray-700">Where Isolated</label>
              <select
                id="whereIsolated"
                name="whereIsolated"
                value={phiData.whereIsolated}
                onChange={handlePhiChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              >
                <option value="">Select Isolation Status</option>
                <option value="Home">Home</option>
                <option value="Hospital">Hospital</option>
                <option value="Not isolated">Not isolated</option>
              </select>
            </div>
            <div>
              <label htmlFor="natureOfCase" className="block text-sm mt-2 font-medium text-gray-700">Nature of Case</label>
              <input
                type="text"
                placeholder="Enter Nature of Case"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="natureOfCase"
                name="natureOfCase"
                value={phiData.natureOfCase}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="oneCaseInOutbreak" className="block text-sm mt-2 font-medium text-gray-700">One Case in Outbreak</label>
              <input
                type="text"
                placeholder="Enter if One Case in Outbreak"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="oneCaseInOutbreak"
                name="oneCaseInOutbreak"
                value={phiData.oneCaseInOutbreak}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="patientsMovements" className="block text-sm mt-2 font-medium text-gray-700">Patient's Movements</label>
              <input
                type="text"
                placeholder="Enter Patient's Movements"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="patientsMovements"
                name="patientsMovements"
                value={phiData.patientsMovements}
                onChange={handlePhiChange}
              />
            </div>
            <div>
              <label htmlFor="laboratoryFindings" className="block text-sm mt-2 font-medium text-gray-700">Laboratory Findings</label>
              <input
                type="text"
                placeholder="Enter Laboratory Findings"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="laboratoryFindings"
                name="laboratoryFindings"
                value={phiData.laboratoryFindings}
                onChange={handlePhiChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ml-10 mr-10">
            <button
              onClick={handleBack}
              className="bg-green-500 w-40 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 w-40 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Submit P.H.I
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}