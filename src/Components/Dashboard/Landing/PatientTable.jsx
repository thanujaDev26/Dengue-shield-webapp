import React from 'react';

const PatientTable = ({ patients, onOpenPatientRecord }) => {
  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">Patient List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Patient Name</th>
            <th className="border p-2">Patient Address</th>
            <th className="border p-2">Patient ID</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td className="border p-2">{patient.patientName}</td>
              <td className="border p-2">{patient.address}</td>
              <td className="border p-2">{patient.patientId}</td>
              <td className="border p-2">
                <button
                  onClick={() => onOpenPatientRecord(patient.patientId)} // Open patient record
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Patient Record
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
