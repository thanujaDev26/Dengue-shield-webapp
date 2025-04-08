import { useEffect, useState } from "react";
import phiService from "../../../service/phiService";
import { useAuth } from "../../ProtectedRoutes/AuthContext";
import authService from "../../../service/authService";
import stompClient from "../../../service/stompClient.js";
import toast from "react-hot-toast";

export default function PhiPanel() {
  const { user } = useAuth();
  const userId = user?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");
  const [messages, setMessages] = useState([]);
  const [writtingmessage, setWrittingMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedMOH, setSelectedMOH] = useState(null); // Set selected MOH to null instead of an array
  const [selectedMsgId, setSelectedMsgId] = useState();

  // Fetch messages and subscribe to new ones
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await phiService.getAllChatMessages(userId);
        const rawMessages = response.data;

        // Filter messages where readstatus is false
        const unreadMessages = rawMessages.filter(
          (msg) => msg.readstatus === false
        );

        const enrichedMessages = await Promise.all(
          unreadMessages.map(async (msg) => {
            try {
              const mohResponse = await authService.getUserDetails(
                "ROLE_MOH",
                msg.senderId
              );

              return { ...msg, mohOfficer: mohResponse.data };
            } catch (err) {
              console.error(
                `Error fetching MOH for senderId ${msg.senderId}:`,
                err
              );
              return {
                ...msg,
                mohOfficer: { appuser: { name: "Unknown MOH" } },
              };
            }
          })
        );

        setMessages(enrichedMessages);
        // Set only unread messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Fetch initial messages
    fetchMessages();

    // Connect and subscribe to the real-time message topic
    const onConnect = () => {
      stompClient.subscribeToTopic(
        `/user/${userId}/queue/messages`,
        (message) => {
          const newMessage = JSON.parse(message.body);

          // Add only unread messages to the state
          if (newMessage.readstatus === false) {
            setMessages((prevMessages) => [newMessage, ...prevMessages]);
          }
        }
      );
    };

    stompClient.connect(onConnect, (error) =>
      console.error("WebSocket Error:", error)
    );

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [userId, messages.length]);

  const handleReply = (phiId, mohOfficerId, msgId) => {
    setIsModalOpen(true);
    setSelectedMOH(mohOfficerId);
    setSelectedMsgId(msgId); // Corrected this
  };

  const changeMsgStatus = async () => {
    try {
      const response = await phiService.setReadStatus(selectedMsgId);
      console.log(response.data);

      // Update the state to reflect the read status change
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !(msg.id === selectedMsgId))
      );
    } catch (error) {
      console.error("Error setting read status:", error);
      toast.error("Failed to mark message as read.");
    }
  };

  const handleSendMessage = () => {
    setSelectedMOH(messages[0].senderId);
    if (!selectedMOH) {
      toast.error("Please select a MOH officer.");
      return;
    }

    if (!newMessage.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    console.log("Sending message:", newMessage);
    console.log("Sending to MOH ID:", selectedMOH);

    // Send the message to the selected MOH (MOH ID as receiver)
    stompClient.sendMessage(
      "/app/chat",
      JSON.stringify({
        senderId: userId, // PHI is the sender
        receiverId: [selectedMOH], // MOH ID as receiver
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: false, // The message is unread initially
      })
    );
    console.log(newMessage);
    // Reset state after sending the message
    setNewMessage(""); // Clear the message input
    setSelectedMOH(null); // Clear the selected MOH
    toast.success("Message sent successfully!");
  };

  const handleSend = () => {
    if (!selectedMOH) {
      toast.error("Please select a MOH officer.");
      return;
    }

    if (!writtingmessage.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    console.log("Sending message:", writtingmessage);
    console.log("Sending to MOH ID:", selectedMOH);

    // Send the message to the selected MOH (MOH ID as receiver)
    stompClient.sendMessage(
      "/app/chat",
      JSON.stringify({
        senderId: userId, // PHI is the sender
        receiverId: [selectedMOH], // MOH ID as receiver
        content: writtingmessage,
        timestamp: new Date().toISOString(),
        read: false, // The message is unread initially
      })
    );

    // Reset state after sending the message
    setWrittingMessage(""); // Clear the message input
    setSelectedMOH(null); // Clear the selected MOH
    setIsModalOpen(false); // Close the modal
    toast.success("Message sent successfully!");
    changeMsgStatus(); // Mark the previous message as read
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto flex">
        {/* Left vertical tab panel */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            PHI Panel
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => setActiveTab("inbox")}
              className={`w-full py-2 px-4 text-left rounded-lg ${
                activeTab === "inbox"
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-700 hover:bg-green-100"
              }`}
            >
              Inbox
            </button>
            <button
              onClick={() => setActiveTab("sendMessage")}
              className={`w-full py-2 px-4 text-left rounded-lg ${
                activeTab === "sendMessage"
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-700 hover:bg-green-100"
              }`}
            >
              Send Message to MOH
            </button>
          </div>
        </div>

        {/* Right content panel */}
        <div className="w-3/4 ml-6">
          {activeTab === "inbox" && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Inbox
              </h3>
              <ul className="space-y-4 max-h-80 overflow-y-auto">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <li
                      key={msg.id}
                      className="bg-green-100 p-4 rounded-xl flex justify-between items-center"
                    >
                      <div>
                        <p className="text-green-800 font-medium">
                          From: {msg.mohOfficer?.appuser?.name || "Unknown"}
                        </p>
                        <p className="text-green-700 text-sm">{msg.content}</p>
                        <p className="text-xs text-green-600 mt-1">
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleReply(userId, msg.mohOfficer?.id, msg.id)
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                      >
                        Reply
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-green-700">No messages received.</li>
                )}
              </ul>
            </div>
          )}

          {activeTab === "sendMessage" && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Send Message to MOH
              </h3>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-4 border border-green-300 rounded-lg text-green-800"
                rows="6"
                placeholder="Type your message..."
              ></textarea>
              <button
                onClick={handleSendMessage}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for replying */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Reply to MOH
            </h3>
            <textarea
              value={writtingmessage}
              onChange={(e) => setWrittingMessage(e.target.value)}
              className="w-full p-4 border border-green-300 rounded-lg text-green-800"
              rows="6"
              placeholder="Type your reply..."
            ></textarea>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSend}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Send
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
