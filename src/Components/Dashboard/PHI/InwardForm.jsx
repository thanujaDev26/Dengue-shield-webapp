// src/components/InwardForm.js
import React, { useState } from 'react';

export default function InwardForm({ patientId, onSubmit }) {
  const [arrivalData, setArrivalData] = useState({
    date: '',
    dateOfAnswer: '',
    invoiceNo: '',
    originalNo: '',
    fromWhom: '',
    subject: '',
    remarks: '',
    dateReciept: '',
  });

  const handleArrivalChange = (e) => {
    const { name, value } = e.target;
    setArrivalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(arrivalData).includes('')) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit(arrivalData);
  };

  return (
    <div className="w-2/3 p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-4">Arrival Form for Patient {patientId}</h2>

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
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={arrivalData.date}
            onChange={handleArrivalChange}
            name="date"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="invoiceNo" className="block text-sm font-medium text-gray-700">
            Invoice No
          </label>
          <input
            type="text"
            id="invoiceNo"
            placeholder="Enter Invoice Number"
            value={arrivalData.invoiceNo}
            onChange={handleArrivalChange}
            name="invoiceNo"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="dateReciept" className="block text-sm font-medium text-gray-700">
            Date of Receipt
          </label>
          <input
            type="date"
            id="dateReciept"
            value={arrivalData.dateReciept}
            onChange={handleArrivalChange}
            name="dateReciept"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="fromWhom" className="block text-sm font-medium text-gray-700">
            From Whom
          </label>
          <input
            type="text"
            id="fromWhom"
            placeholder="Enter From Whom"
            value={arrivalData.fromWhom}
            onChange={handleArrivalChange}
            name="fromWhom"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="originalNo" className="block text-sm font-medium text-gray-700">
            Original Number
          </label>
          <input
            type="text"
            id="originalNo"
            placeholder="Enter Original Number"
            value={arrivalData.originalNo}
            onChange={handleArrivalChange}
            name="originalNo"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter Subject"
            value={arrivalData.subject}
            onChange={handleArrivalChange}
            name="subject"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="dateOfAnswer" className="block text-sm font-medium text-gray-700">
            Date of Answer
          </label>
          <input
            type="date"
            id="dateOfAnswer"
            value={arrivalData.dateOfAnswer}
            onChange={handleArrivalChange}
            name="dateOfAnswer"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
            Remarks
          </label>
          <input
            type="text"
            id="remarks"
            placeholder="Enter Remarks"
            value={arrivalData.remarks}
            onChange={handleArrivalChange}
            name="remarks"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Submit Arrival Form
      </button>
    </div>
  );
}
