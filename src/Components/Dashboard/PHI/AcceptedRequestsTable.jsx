
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
    getMessageList();
  }, [phiId]);

  const acceptedRequests = messageList.map((message) => ({
    id: message.id,
    h544: message.h544,
    status: message.status,
    date: message.updatedAt,
  }));



  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };


  const handleContinue = (messageId) => {
    navigate(`/notebook/${messageId}`); // Navigate to InwardForm with patientId



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
              <th className="px-4 py-2 border-b text-left">
                Go to Inward Form
              </th>
            </tr>

          </thead>
          <tbody>
            {acceptedRequests.length > 0 ? (
              acceptedRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-2 border-b text-left">{request.id}</td>
                  <td className="px-4 py-2 border-b text-left">
                    {request.h544.patient.id}
                  </td>
                  <td className="px-4 py-2 border-b text-left">
                    {request.date.toString().split("T")[0]}
                  </td>
                  <td className="px-4 py-2 border-b text-left">
                    <button
                      onClick={() => handleContinue(request.id)}
                      className={`bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading}
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

         
      )}
    </div>
  );
};
}

export default AcceptedRequestsTable;
