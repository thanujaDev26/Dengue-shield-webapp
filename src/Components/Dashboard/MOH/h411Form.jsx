// src/components/PHIExtendedForm.js

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import phiService from "../../../service/phiService";



export default function H411Form() {
  const [message, setMessage] = useState(null);
    const navigate = useNavigate();
  const [phiData, setPhiData] = useState({
    phiReferenceNo: "",
    mohNotificationNo: "",
    phiRegisterNo: "",
    phiRange: "",
    mohArea: "",
    diseaseAsNotified: "",
    diseaseAsNotifiedDate: "",
    diseaseConfirm: "",
    diseaseConfirmDate: "",
    nameOfPatient: "",
    address: "",
    age: "",
    sex: "",
    ethnicGroup: "",
    dateOfOnset: "",
    dateOfHospitalization: "",
    dateOfDischarge: "",
    nameOfHospital: "",
    outcome: "",
    whereIsolated: "",
    natureOfCase: "",
    oneCaseInOutbreak: "",
    patientsMovements: "",
    laboratoryFindings: "",
  });


  const { messageId } = useParams();

  const handlePhiChange = (e) => {
    const { name, value } = e.target;
    setPhiData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(phiData).includes("")) {
      alert("Please fill out all fields.");
      return;
    }
    onSubmit(phiData);
  };


    useEffect(() => {
      async function getMessage() {
        try {
          const response = await phiService.getMessagebyId(messageId);
  
          if (response.data) {
            setMessage(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getMessage();
    }, [messageId]);





  return (
    <form className="space-y-12 p-6">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-xl font-semibold text-gray-900">
          Extended P.H.I Form for Patient {patientId}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="phiReferenceNo"
              className="block text-sm font-medium text-gray-900"
            >
              P.H.I Name
            </label>
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
            <label
              htmlFor="mohNotificationNo"
              className="block text-sm font-medium text-gray-900"
            >
              M.O.H. Name
            </label>
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
            <label
              htmlFor="phiRegisterNo"
              className="block text-sm font-medium text-gray-900"
            >
              P.H.I. Register No
            </label>
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
            <label
              htmlFor="phiRange"
              className="block text-sm font-medium text-gray-900"
            >
              P.H.I. Range
            </label>
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
            <label
              htmlFor="mohArea"
              className="block text-sm font-medium text-gray-900"
            >
              M.O.H. Area
            </label>
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
            <label
              htmlFor="diseaseAsNotified"
              className="block text-sm font-medium text-gray-900"
            >
              Disease as Notified
            </label>
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
            <label
              htmlFor="diseaseAsNotifiedDate"
              className="block text-sm font-medium text-gray-900"
            >
              Date of Disease Notified
            </label>
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
            <label
              htmlFor="diseaseConfirm"
              className="block text-sm font-medium text-gray-900"
            >
              Disease Confirmed
            </label>
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
            <label
              htmlFor="diseaseConfirmDate"
              className="block text-sm font-medium text-gray-900"
            >
              Date of Disease Confirmation
            </label>
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
            <h2 className="text-2xl font-semibold text-gray-900">
              Patient s Details
            </h2>

            {/* Horizontal Line */}
            <hr className="my-4 border-t-2 border-gray-300" />

            {/* Other content can follow here */}
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="nameOfPatient"
              className="block text-sm font-medium text-gray-900"
            >
              Name of Patient
            </label>
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
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-900"
            >
              Address
            </label>
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
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-900"
            >
              Age
            </label>
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
            <label
              htmlFor="sex"
              className="block text-sm font-medium text-gray-900"
            >
              Sex
            </label>
            <input
              type="text"
              id="sex"
              name="sex"
              value={phiData.sex}
              onChange={handlePhiChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              disabled
            ></input>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="dateOfOnset"
              className="block text-sm font-medium text-gray-900"
            >
              Date of Onset
            </label>
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
            <label
              htmlFor="dateOfHospitalization"
              className="block text-sm font-medium text-gray-900"
            >
              Date of Hospitalization
            </label>
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
            <label
              htmlFor="dateOfDischarge"
              className="block text-sm font-medium text-gray-900"
            >
              Date of Discharge
            </label>
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
            <label
              htmlFor="nameOfHospital"
              className="block text-sm font-medium text-gray-900"
            >
              Name of Hospital
            </label>
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
            <label
              htmlFor="natureOfCase"
              className="block text-sm font-medium text-gray-900"
            >
              Nature of Case
            </label>
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
            <label
              htmlFor="oneCaseInOutbreak"
              className="block text-sm font-medium text-gray-900"
            >
              One Case in Outbreak
            </label>
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

          <div className="sm:col-span-6">
            <label
              htmlFor="laboratoryFindings"
              className="block text-sm font-medium text-gray-900"
            >
              Laboratory Findings
            </label>
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
      </form>
  );

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
