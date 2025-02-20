// src/components/OnwardForm.js
import React, { useState } from 'react';

export default function OnwardForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    no: '',
    date: '',
    toWhom: '',
    subject: '',
    dateOfAnswer: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(formData).includes('')) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="w-2/3 p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-4">Onward Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="no" className="block text-sm font-medium text-gray-700">
            NO
          </label>
          <input
            type="text"
            id="no"
            value={formData.no}
            onChange={handleChange}
            name="no"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            name="date"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="toWhom" className="block text-sm font-medium text-gray-700">
            To Whom
          </label>
          <input
            type="text"
            id="toWhom"
            placeholder="Enter recipient's name"
            value={formData.toWhom}
            onChange={handleChange}
            name="toWhom"
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
            value={formData.subject}
            onChange={handleChange}
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
            value={formData.dateOfAnswer}
            onChange={handleChange}
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
            value={formData.remarks}
            onChange={handleChange}
            name="remarks"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Submit Onward Form
      </button>
    </div>
  );
}
