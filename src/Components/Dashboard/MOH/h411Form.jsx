// src/components/PHIExtendedForm.js
import React, { useState } from 'react';

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

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <form className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto space-y-12">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Extended P.H.I Form for Patient {patientId}
        </h2>
        <p className="text-gray-500 mt-2">Please review the pre-filled data and submit.</p>
      </div>

      {/* Section 1: PHI & MOH Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
          PHI & MOH Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { id: 'phiReferenceNo', label: 'P.H.I Name', disabled: true },
            { id: 'mohNotificationNo', label: 'M.O.H. Name', disabled: true },
            { id: 'phiRegisterNo', label: 'P.H.I. Register No', disabled: false },
            { id: 'phiRange', label: 'P.H.I. Range', disabled: true },
            { id: 'mohArea', label: 'M.O.H. Area', disabled: true },
            { id: 'diseaseAsNotified', label: 'Disease as Notified', disabled: true },
            { id: 'diseaseAsNotifiedDate', label: 'Date of Disease Notified', type: 'date', disabled: true },
            { id: 'diseaseConfirm', label: 'Disease Confirmed', disabled: true },
            { id: 'diseaseConfirmDate', label: 'Date of Disease Confirmation', type: 'date', disabled: true },
          ].map(({ id, label, type = 'text', disabled }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={phiData[id]}
                onChange={handlePhiChange}
                disabled={disabled}
                placeholder={`Enter ${label}`}
                className="w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Patient Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
          Patient Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { id: 'nameOfPatient', label: 'Name of Patient' },
            { id: 'address', label: 'Address' },
            { id: 'age', label: 'Age', type: 'number' },
            { id: 'sex', label: 'Sex' },
            { id: 'dateOfOnset', label: 'Date of Onset', type: 'date' },
            { id: 'dateOfHospitalization', label: 'Date of Hospitalization', type: 'date' },
            { id: 'dateOfDischarge', label: 'Date of Discharge', type: 'date' },
            { id: 'nameOfHospital', label: 'Name of Hospital' },
            { id: 'natureOfCase', label: 'Nature of Case' },
            { id: 'oneCaseInOutbreak', label: 'One Case in Outbreak' },
            { id: 'laboratoryFindings', label: 'Laboratory Findings' },
          ].map(({ id, label, type = 'text' }) => (
            <div key={id} className="col-span-1">
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={phiData[id]}
                onChange={handlePhiChange}
                disabled
                placeholder={`Enter ${label}`}
                className="w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-14'>
          <button
            onClick={handleBack}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit 
          </button>
        </div>
    </form>
  );
}
