import React, { useState } from 'react';

const Landing = () => {
  const [activeForm, setActiveForm] = useState('');
  const [patientId, setPatientId] = useState('');
  const [arrivalData, setArrivalData] = useState({});

  // Show the form based on the form ID
  const showForm = (formId) => {
    setActiveForm(formId);
  };

  // Handle form submission for H544Form
  const submitH544Form = async () => {
    const patientId = document.getElementById('patientId').value;
    setPatientId(patientId);

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
        <div className="w-2/3 p-6 bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">H544 Form</h2>
          <div class="grid grid-cols-1 text-start mt-1 md:grid-cols-2 gap-4">
            <div>
              <label for="institute" class="block text-sm mt-2 font-medium text-gray-700">Institute</label>
              <input
                type="text"
                placeholder="Enter Institute"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="institute"
              />
            </div>
            <div>
              <label for="patientName" class="block text-sm mt-2 font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                placeholder="Enter Patient Name"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="patientName"
              />
            </div>
            <div>
              <label for="patientName" class="block text-sm mt-2 font-medium text-gray-700">Peaditric Patient - Name of Guardian</label>
              <input
                type="text"
                placeholder="Enter  Name of Guardian"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="guardianname"
              />
            </div>

            <div>
              <label for="address" class="block text-sm mt-2 font-medium text-gray-700">Patient Address</label>
              <input
                type="text"
                placeholder="Enter Patient Address"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="address"
              />
            </div>
            <div>
              <label for="patientName" class="block text-sm mt-2 font-medium text-gray-700">Laboratory Results</label>
              <input
                type="text"
                placeholder="Enter Laboratory Results"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="labresult"
              />
            </div>
            <div>
              <label for="institute" class="block text-sm mt-2 font-medium text-gray-700">B.H.T.No </label>
              <input
                type="text"
                placeholder="Enter B.H.T.No"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="bht"
              />
            </div>

            <div>
              <label for="onsetdate" class="block text-sm mt-2 font-medium text-gray-700">Date of Onset</label>
              <input
                type="date"
                placeholder="Enter Date of Onset"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="onsetdate"
              />
            </div>
            <div>
              <label for="onsetdate" class="block text-sm mt-2 font-medium text-gray-700">Date of Admission</label>
              <input
                type="date"
                placeholder="Enter Date of Admission"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="admissiondate"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 text-start mt-1 md:grid-cols-4 gap-4">
            <div>
              <label for="patientId" class="block text-sm mt-2 font-medium text-gray-700">Patient ID</label>
              <input
                type="text"
                placeholder="Enter Patient ID"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="patientId"
              />
            </div>


            <div>
              <label for="patientAge" class="block text-sm mt-2 font-medium text-gray-700">Patient Age</label>
              <input
                type="text"
                placeholder="Enter Patient Age"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="patientAge"
              />
            </div>
            <div>
              <label for="ward" class="block text-sm mt-2 font-medium text-gray-700">Patient Ward</label>
              <input
                type="text"
                placeholder="Enter Patient Ward"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
                id="ward"
              />
            </div>
            <div>
              <label for="gender" class="block text-sm font-medium mt-2  text-gray-700">Gender</label>
              <select
                id="gender"
                class="w-full p-2 mb-4 border border-gray-300 rounded"
              >
                <option value="" disabled selected>Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>




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
        <div className="w-2/3 p-6  bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">Arrival Form for Patient {patientId}</h2>

          {/* Arrival Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Visit (Patient ID)</label>
              <input
                type="text"
                id="patientId"
                placeholder="Enter Visit (Patient ID)"
                value={patientId || ''}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                disabled
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                placeholder="Enter Date"
                value={arrivalData.date || ''}
                onChange={handleArrivalChange}
                name="date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Invoid No</label>
              <input
                type="text"
                id="invoidNo"
                placeholder="Enter Invoid Number"
                value={arrivalData.invoidNo || ''}
                onChange={handleArrivalChange}
                name="invoidNo"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Reciept</label>
              <input
                type="date"
                id="dateReciept"
                placeholder="Enter Date of Reciept"
                value={arrivalData.dateReciept || ''}
                onChange={handleArrivalChange}
                name="dateReciept"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="fromWhom" className="block text-sm font-medium text-gray-700">From Whom</label>
              <input
                type="text"
                id="fromWhom"
                placeholder="Enter From Whom"
                value={arrivalData.fromWhom || ''}
                onChange={handleArrivalChange}
                name="fromWhom"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="originalNo" className="block text-sm font-medium text-gray-700">Original Number</label>
              <input
                type="text"
                id="originalNo"
                placeholder="Enter Original Number"
                value={arrivalData.originalNo || ''}
                onChange={handleArrivalChange}
                name="originalNo"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Enter Subject"
                value={arrivalData.subject || ''}
                onChange={handleArrivalChange}
                name="subject"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="dateOfAnswer" className="block text-sm font-medium text-gray-700">Date of Answer</label>
              <input
                type="date"
                id="dateOfAnswer"
                placeholder="Enter Date of Answer"
                value={arrivalData.dateOfAnswer || ''}
                onChange={handleArrivalChange}
                name="dateOfAnswer"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="dateOfAnswer" className="block text-sm font-medium text-gray-700">Date of Answer</label>
              <input
                type="text"
                id="remarks"
                placeholder="Enter Date of Remarks"
                value={arrivalData.remarks || ''}
                onChange={handleArrivalChange}
                name="remarks"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
           
           
           
           
            
            
          </div>

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
