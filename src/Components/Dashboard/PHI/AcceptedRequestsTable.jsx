import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AcceptedRequestsTable = ({ acceptedRequests }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = (patientId) => {
    navigate(`/notebook`, { state: { patientId } });
  };

  const handleViewDetails = (request) => {
    setSelectedPatient(request);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
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
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {acceptedRequests.length > 0 ? (
            acceptedRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2 border-b">{request.requestId}</td>
                <td className="px-4 py-2 border-b">{request.patientId}</td>
                <td className="px-4 py-2 border-b">{request.date}</td>
                <td className="px-4 py-2 border-b flex flex-col gap-2 md:flex-row">
                  <button
                    onClick={() => handleContinue(request.patientId)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600"
                  >
                    Continue Process
                  </button>
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600"
                  >
                    View Details
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

      {/* Modal Popup */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
            <h3 className="text-xl font-semibold text-emerald-600 mb-4">H544 Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p><strong>Name:</strong> {selectedPatient.labResults}</p>
              <p><strong>Address:</strong> {selectedPatient.address}</p>
              <p><strong>Age:</strong> {selectedPatient.age}</p>
              <p><strong>Gender:</strong> {selectedPatient.gender}</p>
              <p><strong>Telephone Number:</strong> {selectedPatient.telephonenumber}</p>
              <p><strong>Guardian Name:</strong> {selectedPatient.guardianName}</p>
              <p><strong>Lab Results:</strong> {selectedPatient.labResults}</p>
              <p><strong>Date of Onset:</strong> {selectedPatient.dateOfOnset}</p>
              <p><strong>Date of Admission:</strong> {selectedPatient.dateOfAdmission}</p>
              <p><strong>Institute:</strong> {selectedPatient.institute}</p>
              <p><strong>Ward:</strong> {selectedPatient.ward}</p>
              <p><strong>Bed Number:</strong> {selectedPatient.bedNumber}</p>
              <p><strong>Name of Notifier:</strong> {selectedPatient.nameOfNotifier}</p>
              <p><strong>Notifier Status:</strong> {selectedPatient.notifierStatus}</p>
              <p><strong>Disease Name:</strong> {selectedPatient.diseaseName}</p>
              <p><strong>MOH Officer ID:</strong> {selectedPatient.mohOfficerId}</p>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-lg"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedRequestsTable;
