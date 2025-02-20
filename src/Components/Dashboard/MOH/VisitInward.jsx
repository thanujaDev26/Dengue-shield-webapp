import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VisitInward() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard'); // Navigate back to the previous page
};

  // Sample data for patients
  const [patients] = useState([
    { patientId: 'P001', phiId: 'PHI001', address: '123 Street, City' },
    { patientId: 'P002', phiId: 'PHI002', address: '456 Avenue, Town' },
    { patientId: 'P003', phiId: 'PHI003', address: '789 Boulevard, Village' },
  ]);

  // Navigate to Inward Form with patientId
  const handleVisitInwardForm = (patientId) => {
    navigate('/visit-inward-form', { state: { patientId } });
  };

  return (
    <div className="w-full p-6 rounded mt-8">
    <button
        onClick={handleBack}
        className="bg-emerald-800 text-white px-4 py-2 w-40 rounded-full hover:bg-emerald-500 mb-4"
    >
        Back
    </button>
    
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl text-center font-bold mb-5">Pending H544 Table</h2>
                <table className="min-w-full  text-center table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Patient ID</th>
            <th className="border px-4 py-2">Phi ID</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.patientId}>
              <td className="border px-4 py-2">{patient.patientId}</td>
              <td className="border px-4 py-2">{patient.phiId}</td>
              <td className="border px-4 py-2">{patient.address}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleVisitInwardForm(patient.patientId)}
                  className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-400"
                >
                  Visit Inward Form
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
