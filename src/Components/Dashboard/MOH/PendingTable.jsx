import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Pagination from "./Pagination.jsx";
import { useAuth } from "../../ProtectedRoutes/AuthContext.jsx";
import mohService from "../../../service/mohService.js";
import H544FormBody from "./H544FormBody.jsx";
import toast from "react-hot-toast";

const PendingTable = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error handling
  const AuthUser = useAuth();
  const mohId = AuthUser.user.role === "ROLE_MOH" ? AuthUser.user.id : null;
  const [messageList, setMessageList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedMessageStatus, setSelectedMessageStatus] = useState("");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedH544Id, setSelectedH544Id] = useState(null);
  const itemsPerPage = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedRequest((prevData) => ({
      ...prevData,
      [name]:
        name === "ward" || name === "bedNumber" ? Number(value) || 0 : value,
    }));

    console.log(selectedRequest);
  };

  useEffect(() => {
    async function getAllMessages() {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await mohService.getMessageList(mohId);
        const messagelist = response.data;
        setMessageList(messagelist);
      } catch (error) {
        console.error("Error fetching message list:", error);
        setError("Failed to fetch message list. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getAllMessages();
  }, [mohId, messageList.length]);

  const h544List = messageList.map((message) => ({
    messageId: message.id,
    h544: message.h544,
    status: message.status,
    phiName: message.phiOfficer.appuser.name,
  }));

  const filteredRequests = h544List.filter((request) => {
    if (activeTab === "Pending") return request.status === "PENDING";
    if (activeTab === "Sent") return request.status === "SENT";
    return true;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const openViewModal = (request) => {
    setSelectedH544Id(request.h544.id);
    setSelectedMessageStatus(request.status); // Set the selected H544 ID

    const mappedRequest = {
      labResults: request.h544.labResults || "",
      dateOfOnset: request.h544.dateOfOnset || "",
      dateOfAdmission: request.h544.dateOfAdmission || "",
      institute: request.h544.institute || "",
      ward: Number(request.h544.ward) || 0,
      bedNumber: Number(request.h544.bedNumber) || 0,
      nameOfNotifier: request.h544.nameOfNotifier || "",
      notifierStatus: request.h544.notifierStatus || "",
      diseaseName: request.h544.diseaseName || "",
      mohOfficerId: mohId, // You can directly use mohId if it's already set
      patient: request.h544.patient || {},
    };

    setSelectedRequest(mappedRequest);
    setIsViewOpen(true);
  };

  const closeViewModal = () => {
    setSelectedH544Id(null);
    setIsViewOpen(false);
    setSelectedRequest(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handledelete = async (messageId) => {
    try {
      const response = await mohService.deleteMessage(messageId);
      console.log(response.data);
      toast.success("you have successfully deleted the message");
      setMessageList((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
    } catch (error) {
      console.log(error);
      toast.error("something wrong happend when deleting");
    }
  };

  const handleUpdate = async () => {
    if (!selectedH544Id) {
      console.log("No H544 ID selected.");
      return;
    }

    // Remove mohOfficerId and patient fields from selectedRequest
    const { mohOfficerId, patient, ward, bedNumber, ...updatedRequest } =
      selectedRequest;

    // Convert ward and bedNumber to string
    updatedRequest.ward = String(ward);
    updatedRequest.bedNumber = String(bedNumber);

    console.log("Updating request with H544 ID:", selectedH544Id);
    try {
      const response = await mohService.updateH544Form(
        selectedH544Id,
        updatedRequest // Send the updated request with ward and bedNumber as strings
      );
      console.log(response);
      toast.success("Successfully updated the H544 form");
    } catch (error) {
      console.log(error);
      toast.error("Error updating H544 form");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-emerald-700 mb-8 tracking-wide">
        View h544 Requests
      </h1>

      <div className="flex justify-center gap-6 mb-6">
        {["Pending", "Sent", "All"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${
              activeTab === tab
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {isLoading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRequests.map((request) => (
              <div
                key={request.h544.id}
                className="p-6 bg-white shadow-md rounded-lg border-l-4 border-blue-600 hover:shadow-xl transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {request.h544.patient.name}
                </h3>
                <p className="text-gray-600">
                  Disease: {request.h544.diseaseName}
                </p>
                <p className="text-gray-600">
                  Institute: {request.h544.institute}
                </p>
                <p className="text-gray-600">Status: {request.status}</p>
                <p className="text-gray-600">
                  Phi Officer name: {request.phiName}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => openViewModal(request)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors duration-200"
                  >
                    View
                  </button>
                  {(request.status === "PENDING" ||
                    request.status === "COMPLETED") && (
                    <button
                      key={request.messageId}
                      onClick={() => handledelete(request.messageId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors duration-200"
                    >
                      delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredRequests.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {isViewOpen && selectedRequest && (
        <Dialog
          open={isViewOpen}
          onClose={closeViewModal}
          className="fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto max-h-screen overflow-auto">
            <div className="overflow-auto max-h-[80vh] sm:max-h-[70vh] md:max-h-[60vh]">
              <H544FormBody
                formData={selectedRequest}
                handleChange={handleChange}
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
              <button
                onClick={handleUpdate}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto 
    ${
      selectedMessageStatus.trim().toUpperCase() === "PENDING"
        ? "bg-yellow-500 hover:bg-yellow-400 text-white"
        : "bg-gray-400 text-gray-600 cursor-not-allowed"
    }`}
                disabled={
                  selectedMessageStatus.trim().toUpperCase() !== "PENDING"
                }
              >
                Update
              </button>
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default PendingTable;
