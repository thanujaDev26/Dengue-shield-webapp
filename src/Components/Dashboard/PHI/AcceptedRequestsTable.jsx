// src/components/AcceptedRequestsTable.js
import React, { useState } from 'react';

const AcceptedRequestsTable = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([
    { id: 1, requestId: 'H544-001', patientId: 'P001', date: '2025-02-16' },
    { id: 2, requestId: 'H544-002', patientId: 'P002', date: '2025-02-15' },
    { id: 3, requestId: 'H544-003', patientId: 'P003', date: '2025-02-14' },
  ]);
  const [showInwardForm, setShowInwardForm] = useState(false);

  const handleButtonClick3 = (patientId) => {
    setShowInwardForm(true); // Show Inward Form
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-center text-emerald-500 mb-4">Accepted Requests</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Request ID</th>
            <th className="px-4 py-2 border-b text-left">Patient ID</th>
            <th className="px-4 py-2 border-b text-left">Date</th>
            <th className="px-4 py-2 border-b text-left">Go to Inward Form</th>
          </tr>
        </thead>
        <tbody>
          {acceptedRequests.length > 0 ? (
            acceptedRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2 border-b text-left">{request.requestId}</td>
                <td className="px-4 py-2 border-b text-left">{request.patientId}</td>
                <td className="px-4 py-2 border-b text-left">{request.date}</td>
                <td className="px-4 py-2 border-b text-left">
                  <button
                    onClick={() => handleButtonClick3(request.patientId)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600"
                  >
                    Go to Inward Form
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">No accepted requests.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showInwardForm && (
        <div>
          <h3 className="text-2xl text-center text-emerald-500">Inward Form for Patient</h3>
        </div>
      )}
    </div>
  );
};

export default AcceptedRequestsTable;
