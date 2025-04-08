import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ProtectedRoutes/AuthContext";
import phiService from "../../../service/phiService";
import toast from "react-hot-toast";

const AcceptedRequestsTable = () => {
  const [isLoading, setLoading] = useState(false);
  const AuthUser = useAuth();
  const phiId = AuthUser.user.role === "ROLE_PHI" ? AuthUser.user.id : null;
  const [messageList, setMessageList] = useState([]);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    async function getMessageList() {
      setLoading(true);
      try {
        const response = await phiService.getSentMessageList(phiId);
        setMessageList(response.data);
      } catch (error) {
        console.error("Error fetching message list:", error);
        toast.error("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    }
    if (phiId) getMessageList();
  }, [phiId]);

  const acceptedRequests = messageList.map((message) => ({
    id: message.id,
    h544: message.h544,
    status: message.status,
    date: message.updatedAt,
  }));

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = (messageId) => {
    navigate(`/notebook/${messageId}`);
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

      {isLoading ? (
        <div className="flex justify-center py-6">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
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
                  <td className="px-4 py-2 border-b">{request.id}</td>
                  <td className="px-4 py-2 border-b">
                    {request.h544?.patient?.id || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(request.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => handleContinue(request.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      go to note book
                    </button>
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No accepted requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Patient Details</h3>
            <p>
              <strong>Name:</strong> {selectedPatient.h544?.patient?.name}
            </p>
            <p>
              <strong>Gender:</strong> {selectedPatient.h544?.patient?.gender}
            </p>
            <p>
              <strong>Age:</strong> {selectedPatient.h544?.patient?.age}
            </p>
            <p>
              <strong>Disease:</strong> {selectedPatient.h544?.diseaseName}
            </p>
            <p>
              <strong>Institute:</strong> {selectedPatient.h544?.institute}
            </p>
            <p>
              <strong>Ward:</strong> {selectedPatient.h544?.ward}
            </p>
            <p>
              <strong>Bed No:</strong> {selectedPatient.h544?.bedNumber}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedRequestsTable;
