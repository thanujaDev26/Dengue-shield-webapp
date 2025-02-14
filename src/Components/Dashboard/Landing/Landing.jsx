import React, { useState } from 'react';

const Landing = () => {
  const [activeForm, setActiveForm] = useState(''); // Track which form is active
  const [patientId, setPatientId] = useState(''); // Store the patient ID for passing to Arrival Form
  const [arrivalData, setArrivalData] = useState({}); // Store the Arrival Form data

  // Show the form based on the form ID
  const showForm = (formId) => {
    setActiveForm(formId);
  };

  // Handle form submission for H544Form
  const submitH544Form = async () => {
    const patientId = document.getElementById('patientId').value;
    setPatientId(patientId); // Store the patientId to pass to Arrival Form

    // After submitting the H544Form, move to the Arrival Form
    setActiveForm('ArrivalForm');
  };

  // Handle form submission for Arrival Form
  const submitArrivalForm = async () => {
    const { date, dateOfAnswer, invoiceNo, originalNo, fromWhom, subject } = arrivalData;

    // Validate the data before sending to backend
    if (!date || !dateOfAnswer || !invoiceNo || !originalNo || !fromWhom || !subject) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Send ArrivalForm data to backend (API call)
      const response = await fetch('https://your-backend-api.com/arrival', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId,
          date,
          dateOfAnswer,
          invoiceNo,
          originalNo,
          fromWhom,
          subject,
        }),
      });

      // Check if the response is successful
      if (response.ok) {
        const result = await response.json();
        alert('Arrival Form submitted successfully!');

        // Optionally, reset the form or navigate somewhere
        setActiveForm('');
      } else {
        alert('Error submitting Arrival Form. Please try again.');
      }
    } catch (error) {
      alert('There was an error with the request: ' + error.message);
    }
  };

  // Handle changes in Arrival Form fields
  const handleArrivalChange = (e) => {
    const { name, value } = e.target;
    setArrivalData((prevData) => ({
      ...prevData,
      [name]: value, // Update the arrival data with the new value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-row justify-row gap-4 mb-6">
        <button
          onClick={() => showForm('H544Form')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          H544 Form
        </button>
        <button
          onClick={() => showForm('ArrivalForm')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Arrival Form
        </button>
      </div>

      {/* H544 Form */}
      {activeForm === 'H544Form' && (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">H544 Form</h2>
          <input
            type="text"
            placeholder="Enter Patient ID"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            id="patientId"
          />
          <input
            type="text"
            placeholder="Enter Patient Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            id="patientName"
          />
          <textarea
            placeholder="Enter Details"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            rows="5"
            id="details"
          ></textarea>
          <input
            type="text"
            placeholder="Enter Patient Ward"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            id="ward"
          />
          <input
            type="text"
            placeholder="Enter Patient Address"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            id="address"
          />
          <button
            onClick={submitH544Form}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      )}

      {/* Arrival Form */}
      {activeForm === 'ArrivalForm' && patientId && (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">Arrival Form for Patient {patientId}</h2>

          {/* Arrival Form fields */}
          <input
            type="text"
            placeholder="Enter Visit (Patient ID)"
            value={patientId || ''}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
          <input
            type="date"
            placeholder="Enter Date"
            value={arrivalData.date || ''}
            onChange={handleArrivalChange}
            name="date"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="date"
            placeholder="Enter Date of Answer"
            value={arrivalData.dateOfAnswer || ''}
            onChange={handleArrivalChange}
            name="dateOfAnswer"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Enter Invoice Number"
            value={arrivalData.invoiceNo || ''}
            onChange={handleArrivalChange}
            name="invoiceNo"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Enter Original Number"
            value={arrivalData.originalNo || ''}
            onChange={handleArrivalChange}
            name="originalNo"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Enter From Whom"
            value={arrivalData.fromWhom || ''}
            onChange={handleArrivalChange}
            name="fromWhom"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Enter Subject"
            value={arrivalData.subject || ''}
            onChange={handleArrivalChange}
            name="subject"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <button
            onClick={submitArrivalForm}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit Arrival Form
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;
