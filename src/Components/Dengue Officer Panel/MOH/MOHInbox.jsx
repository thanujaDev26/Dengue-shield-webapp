import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import mohService from "../../../service/mohService.js";
import { useAuth } from "../../ProtectedRoutes/AuthContext";
import stompClient from "../../../service/stompClient.js";

export default function MOHInbox() {
  const { user } = useAuth();
  const userId = user.id;

  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch messages initially
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await mohService.getAllChatMessages(userId);
        const unreadMessages = res.data.filter((msg) => !msg.readstatus);
        setMessages(unreadMessages);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchMessages();
  }, [userId]);

  // Handle pagination
  const paginateMessages = (page) => {
    const startIndex = (page - 1) * 3;
    const endIndex = startIndex + 3;
    return messages.slice(startIndex, endIndex);
  };

  const handlePageChange = (direction) => {
    const newPage = currentPage + direction;
    if (newPage > 0 && newPage <= Math.ceil(messages.length / 3)) {
      setCurrentPage(newPage);
    }
  };

  // Subscribe to new messages in real-time
  useEffect(() => {
    const onConnect = () => {
      stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
        const newMessage = JSON.parse(message.body);
        if (!newMessage.readstatus) {
          setMessages((prevMessages) => [newMessage, ...prevMessages]);
        }
      });
    };

    stompClient.connect(onConnect, (error) =>
      console.error("WebSocket Error:", error)
    );

    return () => stompClient.disconnect();
  }, [userId]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-green-700 mb-6">Inbox</h2>
      {messages.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">
          No new messages at the moment.
        </p>
      ) : (
        <div className="space-y-6">
          {paginateMessages(currentPage).map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              setMessages={setMessages}
              stompClient={stompClient}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300"
          disabled={currentPage * 3 >= messages.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
