import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import phiService from "../../../service/phiService";
import { useAuth } from "../../ProtectedRoutes/AuthContext";
import toast from "react-hot-toast";

export default function H544Table() {
  const [isLoading, setLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const [messageList, setMessageList] = useState([]);

  const AuthUser = useAuth();
  const phiId = AuthUser.user.role === "ROLE_PHI" ? AuthUser.user.id : null;
  console.log("phi id is" + phiId);

  useEffect(() => {
    async function getMessageList() {
      setLoading(true);
      try {
        const response = await phiService.getMessageList(phiId);
        setMessageList(response.data);
      } catch (error) {
        console.error("Error fetching message list:", error);
        toast.error("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    }
    getMessageList();
  }, [phiId, messageId]);

  const h544Requests = messageList.map((message) => ({
    id: message.id,
    h544: message.h544,
    status: message.status,
    dateCreated: message.createdAt,
  }));

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const handleAccept = async (messageId) => {
    setIsAccepting(true);
    try {
      const response = await phiService.updateStatus(messageId);
      console.log(response.data);
      toast.success("You have successfully accepted the H544 request.");
      setMessageId(messageId);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsAccepting(false);
    }
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
        <h2 className="text-2xl font-semibold text-center text-emerald-500 mb-4">
          H544 Requests
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading requests...</p>
        ) : (
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
              {h544Requests.length > 0 ? (
                h544Requests.map((request) => (
                  <tr key={request.h544.id}>
                    <td className="px-4 py-2 border-b text-left">
                      H544-{request.h544.id}
                    </td>
                    <td className="px-4 py-2 border-b text-left">
                      {request.h544.patient.id}
                    </td>
                    <td className="px-4 py-2 border-b text-left">
                      {request.dateCreated.toString().split("T")[0]}
                    </td>
                    <td className="px-4 py-2 border-b text-left">
                      <button
                        className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 disabled:bg-gray-400"
                        onClick={() => handleAccept(request.id)}
                        disabled={isAccepting}
                      >
                        {isAccepting ? "Processing..." : "Accept"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
