import React, { useState } from 'react';
import H544Form from './Landing/H544Form';
import PatientTable from './Landing/PatientTable';
import ArrivalForm from './Landing/ArrivalForm'; 
import NoteBook from './Landing/NoteBook'; // Import NotebookForm component

const LandingApp = () => {
  const [activeForm, setActiveForm] = useState('');
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [notes, setNotes] = useState('');

  const showForm = (formId) => {
    setActiveForm(formId);
  };

  const handleH544Submit = (patientId) => {
    const newPatient = {
      patientId,
      patientName: `Patient ${patientId}`,
      address: `Address for ${patientId}`,
    };
    setPatients((prevPatients) => [...prevPatients, newPatient]);
    setPatientId(patientId);
    setActiveForm('ArrivalForm');
  };

  const handleArrivalSubmit = (arrivalData) => {
    alert('Arrival form submitted');
    setActiveForm('');
  };

  const handleOpenPatientRecord = (patientId) => {
    setPatientId(patientId); 
    setActiveForm('NoteBook'); // Show the NotebookForm for the selected patient
  };

  const handleSaveNotes = (notes) => {
    alert(`Notes saved: ${notes}`);
    setActiveForm(''); // After saving, return to the initial state
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => showForm('H544Form')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          H544 Form
        </button>
        <button
          onClick={() => showForm('PatientTable')}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Show Table
        </button>
      </div>

      {activeForm === 'H544Form' && <H544Form onSubmit={handleH544Submit} />}
      {activeForm === 'ArrivalForm' && patientId && (
        <ArrivalForm patientId={patientId} onSubmit={handleArrivalSubmit} />
      )}
      
      {activeForm === 'PatientTable' && (
        <PatientTable
          patients={patients}
          onOpenPatientRecord={handleOpenPatientRecord}
        />
      )}

      {/* Render NotebookForm when selected */}
      {activeForm === 'NoteBook' && patientId && (
        <NotebookForm patientId={patientId} onSubmit={handleSaveNotes} />
      )}
    </div>
  );
};

export default LandingApp;
