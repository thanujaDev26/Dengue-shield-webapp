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
          Documents Inward Register {patientId}
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

          {/* <div>
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
          </div> */}

          <div>
            <label htmlFor="invoiceNo" className="block text-sm font-medium text-gray-700">
              Inward No
            </label>
            <input
              type="text"
              id="h544no"
              placeholder="H544 ID"
              value={arrivalData.h544no}
              onChange={handleArrivalChange}
              name="h544no"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          {/* <div>
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
          </div> */}

          <div>
            <label htmlFor="fromWhom" className="block text-sm font-medium text-gray-700">
              From Whom
            </label>
            <input
              type="text"
              id="fromWhom"
              placeholder="Name of the MOH"
              value={arrivalData.fromWhom}
              onChange={handleArrivalChange}
              name="fromWhom"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          {/* <div>
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
          </div> */}

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              id="subject"
              placeholder="Enter Subject"
              value={arrivalData.subject}
              onChange={handleArrivalChange}
              name="subject"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="Cholera">Cholera</option>
              <option value="Plague">Plague</option>
              <option value="Yellow Fever">Yellow Fever</option>
              <option value="Acute Poliomyelitis / Acute Flaccid Paralysis">Acute Poliomyelitis / Acute Flaccid Paralysis</option>
              <option value="Chickenpox">Chickenpox</option>
              <option value="Dengue Fever / Dengue Haemorrhagic Fever">Dengue Fever / Dengue Haemorrhagic Fever</option>
              <option value="Diphtheria">Diphtheria</option>
              <option value="Dysentery">Dysentery</option>
              <option value="Encephalitis">Encephalitis</option>
              <option value="Enteric Fever (Typhoid & Paratyphoid Fever)">Enteric Fever (Typhoid & Paratyphoid Fever)</option>
              <option value="Food Poisoning">Food Poisoning</option>
              <option value="Human Rabies">Human Rabies</option>
              <option value="Leptospirosis">Leptospirosis</option>
              <option value="Malaria">Malaria</option>
              <option value="Measles">Measles</option>
              <option value="Meningitis">Meningitis</option>
              <option value="Mumps">Mumps</option>
              <option value="Rubella / Congenital Rubella Syndrome">Rubella / Congenital Rubella Syndrome</option>
              <option value="Simple Continued Fever of Over 7 Days or More">Simple Continued Fever of Over 7 Days or More</option>
              <option value="Tetanus">Tetanus</option>
              <option value="Neonatal Tetanus">Neonatal Tetanus</option>
              <option value="Typhus Fever">Typhus Fever</option>
              <option value="Viral Hepatitis">Viral Hepatitis</option>
              <option value="Whooping Cough (Pertussis)">Whooping Cough (Pertussis)</option>
              <option value="Tuberculosis">Tuberculosis</option>
              <option value="Leishmaniasis">Leishmaniasis</option>
              <option value="Leprosy">Leprosy</option>
            </select>
          </div>

          {/* <div>
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
          </div> */}

          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
              Remarks
            </label>
            <textarea
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
