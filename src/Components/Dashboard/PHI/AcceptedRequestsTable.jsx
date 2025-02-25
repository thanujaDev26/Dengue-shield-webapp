import React from 'react';
import { useNavigate } from 'react-router-dom';

const AcceptedRequestsTable = ({ acceptedRequests }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleContinue = (patientId) => {
    navigate(`/notebook`, { state: { patientId } }); // Navigate to InwardForm with patientId
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg mt-8">
      <button
        onClick={handleBack}
        className="bg-emerald-800 text-white px-4 py-2 w-40 rounded-full hover:bg-emerald-500 mb-4"
      >
        Back
      </button>
      <h2 className="text-2xl font-semibold text-center text-emerald-500 mb-4">
        Accepted Requests
      </h2>
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
                    onClick={() => handleContinue(request.patientId)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600"
                  >
                    Continue Process
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No accepted requests.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptedRequestsTable;
