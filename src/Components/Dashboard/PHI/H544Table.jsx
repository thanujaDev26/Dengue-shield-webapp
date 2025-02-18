// src/components/H544Table.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function H544Table() {
  const [h544Requests, setH544Requests] = useState([
    { id: 1, requestId: 'H544-001', date: '2025-02-16', patientId: 'P001' },
    { id: 2, requestId: 'H544-002', date: '2025-02-15', patientId: 'P002' },
    { id: 3, requestId: 'H544-003', date: '2025-02-14', patientId: 'P003' },
  ]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleAccept = (patientId, h544Id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to accept Patient ID: ${patientId}, H544 form: ${h544Id}?`
    );

    if (confirmDelete) {
      const updatedH544Requests = h544Requests.filter(
        (request) => request.requestId !== h544Id
      );
      const acceptedRequest = h544Requests.find((request) => request.requestId === h544Id);

      setH544Requests(updatedH544Requests);
      setAcceptedRequests([...acceptedRequests, acceptedRequest]);

      setNotification(`Notification sent to MOH for Patient ID: ${patientId}, H544 form: ${h544Id}.`);

      // navigate('/accepted-requests');
    } else {
      setNotification('Action canceled.');
    }
  };

  return (
    <div>
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-emerald-500 mb-4">H544 Requests</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Request ID</th>
              <th className="px-4 py-2 border-b text-left">Patient ID</th>
              <th className="px-4 py-2 border-b text-left">Date</th>
              <th className="px-4 py-2 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {h544Requests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2 border-b text-left">{request.requestId}</td>
                <td className="px-4 py-2 border-b text-left">{request.patientId}</td>
                <td className="px-4 py-2 border-b text-left">{request.date}</td>
                <td className="px-4 py-2 border-b text-left">
                  <button
                    onClick={() => handleAccept(request.patientId, request.requestId)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600"
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {notification && (
        <div className="mt-4 p-4 bg-yellow-200 text-yellow-800 rounded-lg">
          {notification}
        </div>
      )}
    </div>
  );
}
