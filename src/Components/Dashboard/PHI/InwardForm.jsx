import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function InwardForm({ onSubmit }) {
  const location = useLocation();
  const { patientId } = location.state || {};
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    if (Object.values(arrivalData).includes('')) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arrivalData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Form Submitted:', result);
      alert('Data submitted successfully!');

    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again later.');
    }
  };

  const handleContinue = () => {
    navigate('/notebook', { state: { patientId } }); // Navigate to Notebook with patientId
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className='justify-items-center'>
      <div className="w-2/3 items-center p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
        <h2 className="text-2xl text-center font-bold mb-20">
          Arrival Form for Patient {patientId}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
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
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 ml-10 mr-10'>
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
            Submit Arrival Form
          </button>
          <button
            onClick={handleContinue}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
