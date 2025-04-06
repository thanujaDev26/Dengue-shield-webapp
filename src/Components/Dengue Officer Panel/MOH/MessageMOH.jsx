import PropTypes from "prop-types";
import { useState } from "react";
import stompClient from "../../../service/stompClient";

export default function MessageMOH({ assignedPHIs, userId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPHIs, setSelectedPHIs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  stompClient.connect();
  const filteredPHIs = assignedPHIs.filter((phi) =>
    `${phi.appuser.name} ${phi.area}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const recordsPerPage = 4;
  const totalPages = Math.ceil(filteredPHIs.length / recordsPerPage);
  const startIdx = (currentPage - 1) * recordsPerPage;
  const currentPHIs = filteredPHIs.slice(startIdx, startIdx + recordsPerPage);

  const togglePHI = (id) => {
    setSelectedPHIs((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const selectAllOnPage = () => {
    const currentIds = currentPHIs.map((phi) => phi.id);
    const allSelected = currentIds.every((id) => selectedPHIs.includes(id));
    if (allSelected) {
      setSelectedPHIs((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedPHIs((prev) => [...new Set([...prev, ...currentIds])]);
    }
  };

  const handleSend = () => {
    console.log("Message:", message);
    console.log("Sending to IDs:", selectedPHIs);

    // Send the message to each selected PHI
    stompClient.sendMessage(
      "/app/chat",
      JSON.stringify({
        senderId: userId,
        receiverId: selectedPHIs, // Can be an array of user IDs for multiple recipients
        content: message,
        timestamp: new Date().toISOString(),
        read: false,
      })
    );

    // Reset state after sending the message
    setIsModalOpen(false);
    setMessage("");
    setSelectedPHIs([]);
    setShowToast(true);

    // Disconnect the stompClient
    stompClient.disconnect();

    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md relative">
      <h3 className="text-xl font-semibold text-green-700 mb-4">
        Message PHI Officers
      </h3>

      <input
        type="text"
        placeholder="Search PHIs..."
        className="w-full mb-4 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-green-700 font-medium">
          <input
            type="checkbox"
            onChange={selectAllOnPage}
            checked={currentPHIs.every((phi) => selectedPHIs.includes(phi.id))}
          />{" "}
          Select All on Page
        </label>

        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="text-green-700 font-bold text-lg disabled:opacity-30"
          >
            {"<"}
          </button>
          <span className="text-green-700 font-medium">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="text-green-700 font-bold text-lg disabled:opacity-30"
          >
            {">"}
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {currentPHIs.map((phi) => (
          <li
            key={phi.id}
            className="flex justify-between items-center bg-green-100 p-4 rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedPHIs.includes(phi.id)}
                onChange={() => togglePHI(phi.id)}
              />
              <div>
                <p className="text-green-800 font-medium">{phi.appuser.name}</p>
                <p className="text-sm text-green-700">Area: {phi.area}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedPHIs.length > 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Send Message to {selectedPHIs.length} PHI
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Compose Message
            </h2>
            <textarea
              rows="5"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
          Message sent successfully!
        </div>
      )}
    </div>
  );
}

MessageMOH.propTypes = {
  assignedPHIs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      area: PropTypes.string.isRequired,
      appuser: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  userId: PropTypes.number.isRequired,
};
