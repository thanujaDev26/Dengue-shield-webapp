// src/components/PHIExtendedForm.js
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

export default function H411Form({ patientId, onSubmit }) {
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
    <form className="space-y-12 p-6">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-xl font-semibold text-gray-900">Extended P.H.I Form for Patient {patientId}</h2>
        
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="phiReferenceNo" className="block text-sm font-medium text-gray-900">P.H.I Name</label>
            <input
              type="text"
              id="phiReferenceNo"
              name="phiReferenceNo"
              placeholder="Enter P.H.I Name"
              value={phiData.phiReferenceNo}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="mohNotificationNo" className="block text-sm font-medium text-gray-900">M.O.H. Name</label>
            <input
              type="text"
              id="mohNotificationNo"
              name="mohNotificationNo"
              placeholder="Enter M.O.H. Name"
              value={phiData.mohNotificationNo}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="phiRegisterNo" className="block text-sm font-medium text-gray-900">P.H.I. Register No</label>
            <input
              type="text"
              id="phiRegisterNo"
              name="phiRegisterNo"
              placeholder="Enter P.H.I. Register Number"
              value={phiData.phiRegisterNo}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="phiRange" className="block text-sm font-medium text-gray-900">P.H.I. Range</label>
            <input
              type="text"
              id="phiRange"
              name="phiRange"
              placeholder="Distance from PHI Office to Pations House"
              value={phiData.phiRange}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="mohArea" className="block text-sm font-medium text-gray-900">M.O.H. Area</label>
            <input
              type="text"
              id="mohArea"
              name="mohArea"
              placeholder="Enter M.O.H. Area"
              value={phiData.mohArea}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="diseaseAsNotified" className="block text-sm font-medium text-gray-900">Disease as Notified</label>
            <input
              type="text"
              id="diseaseAsNotified"
              name="diseaseAsNotified"
              placeholder="Enter Disease as Notified"
              value={phiData.diseaseAsNotified}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="diseaseAsNotifiedDate" className="block text-sm font-medium text-gray-900">Date of Disease Notified</label>
            <input
              type="date"
              id="diseaseAsNotifiedDate"
              name="diseaseAsNotifiedDate"
              value={phiData.diseaseAsNotifiedDate}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="diseaseConfirm" className="block text-sm font-medium text-gray-900">Disease Confirmed</label>
            <input
              type="text"
              id="diseaseConfirm"
              name="diseaseConfirm"
              placeholder="Enter Disease Confirmed"
              value={phiData.diseaseConfirm}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="diseaseConfirmDate" className="block text-sm font-medium text-gray-900">Date of Disease Confirmation</label>
            <input
              type="date"
              id="diseaseConfirmDate"
              name="diseaseConfirmDate"
              value={phiData.diseaseConfirmDate}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
            
          </div>

            <div className="p-6">
              {/* Heading */}
              <h2 className="text-2xl font-semibold text-gray-900">Patient's Details</h2>
              
              {/* Horizontal Line */}
              <hr className="my-4 border-t-2 border-gray-300" />

              {/* Other content can follow here */}
            </div>


          <div className="sm:col-span-6">
            <label htmlFor="nameOfPatient" className="block text-sm font-medium text-gray-900">Name of Patient</label>
            <input
              type="text"
              id="nameOfPatient"
              name="nameOfPatient"
              placeholder="Enter Name of Patient"
              value={phiData.nameOfPatient}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="address" className="block text-sm font-medium text-gray-900">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={phiData.address}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="age" className="block text-sm font-medium text-gray-900">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter Age"
              value={phiData.age}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-900">Sex</label>
            <input
              type='text'
              id="sex"
              name="sex"
              value={phiData.sex}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            >
            </input>
            
          </div>

          {/* <div className="sm:col-span-3">
            <label htmlFor="ethnicGroup" className="block text-sm font-medium text-gray-900">Ethnic Group</label>
            <select
              id="ethnicGroup"
              name="ethnicGroup"
              value={phiData.ethnicGroup}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            >
              <option value="">Select Ethnic Group</option>
              <option value="Sinhalese">Sinhalese</option>
              <option value="Tamil">Tamil</option>
              <option value="Muslim">Muslim</option>
              <option value="Burgher">Burgher</option>
              <option value="Others">Others</option>
            </select>
            <div className="w-full">
           
            <h2 className="text-2xl w-full font-semibold text-gray-900">Disease Infromation</h2>
            
           
            <hr className="my-4 border-t-2 border-gray-300" />

            
            </div>
          </div> */}

          <div className="sm:col-span-3">
            <label htmlFor="dateOfOnset" className="block text-sm font-medium text-gray-900">Date of Onset</label>
            <input
              type="date"
              id="dateOfOnset"
              name="dateOfOnset"
              value={phiData.dateOfOnset}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="dateOfHospitalization" className="block text-sm font-medium text-gray-900">Date of Hospitalization</label>
            <input
              type="date"
              id="dateOfHospitalization"
              name="dateOfHospitalization"
              value={phiData.dateOfHospitalization}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="dateOfDischarge" className="block text-sm font-medium text-gray-900">Date of Discharge</label>
            <input
              type="date"
              id="dateOfDischarge"
              name="dateOfDischarge"
              value={phiData.dateOfDischarge}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="nameOfHospital" className="block text-sm font-medium text-gray-900">Name of Hospital</label>
            <input
              type="text"
              id="nameOfHospital"
              name="nameOfHospital"
              placeholder="Enter Name of Hospital"
              value={phiData.nameOfHospital}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="natureOfCase" className="block text-sm font-medium text-gray-900">Nature of Case</label>
            <input
              type="text"
              id="natureOfCase"
              name="natureOfCase"
              placeholder="Enter Nature of Case"
              value={phiData.natureOfCase}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="oneCaseInOutbreak" className="block text-sm font-medium text-gray-900">One Case in Outbreak</label>
            <input
              type="text"
              id="oneCaseInOutbreak"
              name="oneCaseInOutbreak"
              placeholder="Enter if One Case in Outbreak"
              value={phiData.oneCaseInOutbreak}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          {/* <div className="sm:col-span-6">
            <label htmlFor="patientsMovements" className="block text-sm font-medium text-gray-900">Patient's Movements</label>
            <input
              type="text"
              id="patientsMovements"
              name="patientsMovements"
              placeholder="Enter Patient's Movements"
              value={phiData.patientsMovements}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div> */}

          <div className="sm:col-span-6">
            <label htmlFor="laboratoryFindings" className="block text-sm font-medium text-gray-900">Laboratory Findings</label>
            <input
              type="text"
              id="laboratoryFindings"
              name="laboratoryFindings"
              placeholder="Enter Laboratory Findings"
              value={phiData.laboratoryFindings}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit and Send to MOH
        </button>
      </div>
    </form>
  );
}
