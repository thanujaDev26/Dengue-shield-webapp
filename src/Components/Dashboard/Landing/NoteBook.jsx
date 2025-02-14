// NotebookForm.js
import React, { useState, useEffect } from 'react';

const NoteBook = ({ patientId, onSubmit }) => {
  const [notes, setNotes] = useState('');
  const [patientData, setPatientData] = useState(null);

  // Fetch patient details when component is mounted
  useEffect(() => {
    // Here, simulate fetching patient details for the patientId
    // You can replace this with actual data fetching logic (e.g., API call)
    const patientDetails = {
      patientId,
      patientName: `Patient ${patientId}`, // This would be dynamic
      address: `Address of Patient ${patientId}`, // This would be dynamic
    };
    setPatientData(patientDetails);
  }, [patientId]);

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(notes);
  };

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">Notebook Form for {patientData?.patientName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Patient Address</label>
          <input
            type="text"
            value={patientData?.address || ''}
            disabled
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={notes}
            onChange={handleNoteChange}
            placeholder="Enter notes for the patient..."
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Save Notes
        </button>
      </form>
    </div>
  );
};

export default NoteBook;
