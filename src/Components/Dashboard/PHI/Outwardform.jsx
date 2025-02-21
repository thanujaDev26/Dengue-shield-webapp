import { useState } from "react";

export default function Outwardform({ onSubmit }) {
  const [formData, setFormData] = useState({
    no: "",
    date: "",
    toWhom: "",
    subject: "",
    dateOfAnswer: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(formData).includes("")) {
      alert("Please fill out all fields.");
      return;
    }
    onSubmit(formData);
  };

  const handleContinue = () => {
    navigate('/h411-form'); // Navigate to Notebook with patientId
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <form className="space-y-12 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
      <h2 className="text-2xl font-semibold text-gray-900">Outward Form</h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* NO Field */}
        <div className="sm:col-span-3">
          <label
            htmlFor="no"
            className="block text-sm font-medium text-gray-900"
          >
            H544 ID
          </label>
          <input
            type="text"
            id="no"
            value={formData.no}
            onChange={handleChange}
            name="no"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        {/* Date Field
        <div className="sm:col-span-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-900"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            name="date"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
        </div> */}

        {/* To Whom Field */}
        <div className="sm:col-span-3">
          <label
            htmlFor="toWhom"
            className="block text-sm font-medium text-gray-900"
          >
            To Whom
          </label>
          <input
            type="text"
            id="toWhom"
            placeholder="Enter recipient's name"
            value={formData.toWhom}
            onChange={handleChange}
            name="toWhom"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        {/* Subject Field */}
        <div className="sm:col-span-3">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-900"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter Subject"
            value={formData.subject}
            onChange={handleChange}
            name="subject"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        {/* Date of Answer Field
        <div className="sm:col-span-3">
          <label
            htmlFor="dateOfAnswer"
            className="block text-sm font-medium text-gray-900"
          >
            Date of Answer
          </label>
          <input
            type="date"
            id="dateOfAnswer"
            value={formData.dateOfAnswer}
            onChange={handleChange}
            name="dateOfAnswer"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
        </div> */}

        {/* Remarks Field */}
        <div className="sm:col-span-3">
          <label
            htmlFor="remarks"
            className="block text-sm font-medium text-gray-900"
          >
            Remarks
          </label>
          <input
            type="text"
            id="remarks"
            placeholder="Enter Remarks"
            value={formData.remarks}
            onChange={handleChange}
            name="remarks"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Submit Button */}
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
            Submit 
          </button>
          <button
            onClick={handleContinue}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Next
          </button>
        </div>
    </form>

    
  );

  
}
