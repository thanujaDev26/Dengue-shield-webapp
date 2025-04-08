import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import mohService from "../../../service/mohService"; // Service for handling backend requests
import authService from "../../../service/authService"; // Service for fetching user details

export default function ChatMessage({ message, setMessages, stompClient }) {
  const [senderName, setSenderName] = useState("Loading...");
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedMOH, setSelectedMOH] = useState(null); // Store selected MOH (receiver) ID

  useEffect(() => {
    const fetchSenderName = async () => {
      try {
        const res = await authService.getUserDetails(
          "ROLE_PHI",
          message.senderId
        );
        setSenderName(res.data.appuser.name);
      } catch (err) {
        console.error("Error fetching PHI name:", err);
        setSenderName("Unknown");
      }
    };

    fetchSenderName();
  }, [message.senderId]);

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      // Send the reply via Stomp
      const replyMessage = {
        senderId: message.receiverId, // PHI is the sender
        receiverId: [message.senderId], // MOH (receiver) is the sender of the original message
        content: replyText,
        timestamp: new Date().toISOString(),
        read: false, // Initially, the reply will be unread
      };

      // Send the message using Stomp
      stompClient.sendMessage(
        "/app/chat", // Stomp destination
        JSON.stringify(replyMessage)
      );

      // After sending the message, mark the original message as read
      await handleStatusChange(message.id);

      toast.success("Reply sent!");
      setIsReplyOpen(false); // Close the reply modal
      setReplyText(""); // Clear the reply text
    } catch (error) {
      toast.error("Failed to send reply");
      console.error(error);
    }
  };

  // Method to handle the change of read status for the original message
  const handleStatusChange = async (msgId) => {
    try {
      const response = await mohService.setReadStatus(msgId);
      console.log("Message read status updated:", response.data);

      // Update the messages state to remove the read message

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !(msg.id === msgId))
      );
    } catch (error) {
      console.error("Error setting read status:", error);
      toast.error("Failed to mark message as read.");
    }
  };

  return (
    <div className="bg-white shadow-lg p-5 rounded-xl mb-5 border border-gray-200">
      <p className="font-semibold text-green-800 text-xl">{`From: ${senderName}`}</p>
      <p className="mt-2 text-gray-700 text-base">{message.content}</p>
      <button
        onClick={() => setIsReplyOpen(true)}
        className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
      >
        Reply
      </button>

      {/* Modal */}
      {isReplyOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              Reply to {senderName}
            </h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
              className="w-full h-28 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsReplyOpen(false)}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    receiverId: PropTypes.number.isRequired,
    senderId: PropTypes.number.isRequired, // Sender ID (original message sender)
    content: PropTypes.string.isRequired, // Message content
    readStatus: PropTypes.bool.isRequired, // Read status of the message
  }).isRequired,
  setMessages: PropTypes.func, // Function to update the messages state
  stompClient: PropTypes.object.isRequired, // Stomp client for messaging
  
};
