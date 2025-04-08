import Apiclient from "./apiClient.js"; // Import the reusable Axios client

let API_URL = "/api/v1/phi/";

const getMessageList = async (phiid) => {
  try {
    console.log(phiid);
    const response = await Apiclient.get(
      API_URL + `getAllPendingMessages/${phiid}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during getting message list:", error);
    throw error;
  }
};

const updateStatus = async (id) => {
  try {
    const response = await Apiclient.patch(
      `${API_URL}updateMessageStatus/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating message Status:", error);
    throw error;
  }
};

const getSentMessageList = async (phiid) => {
  try {
    console.log(phiid);
    const response = await Apiclient.get(
      API_URL + `getAllSentMessages/${phiid}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during getting message list:", error);
    throw error;
  }
};

const getMessagebyId = async (messageId) => {
  try {
    console.log(messageId);
    const response = await Apiclient.get(API_URL + `getMessage/${messageId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during getting message:", error);
    throw error;
  }
};

const saveNote = async (phiId, note) => {
  try {
    console.log(note);
    const response = await Apiclient.post(
      API_URL + `saveNotebook/${phiId}`,
      note
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during disease notification save:", error);
    throw error;
  }
};

const getAllChatMessages = async (phiId) => {
  try {
    console.log(phiId);
    const response = await Apiclient.get(`/getChatMessages/${phiId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during getting message:", error);
    throw error;
  }
};

const setReadStatus = async (msgId) => {
  try {
    const response = await Apiclient.post(`/setChatMessageStatus`, msgId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during changing message status:", error);
    throw error;
  }
};

const saveExtendedFormData = async (id, updates) => {
  try {
    const response = await Apiclient.post(
      "/api/v1/H411" + `/saveExtendedFormData/${id}`,
      updates
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during saving h411:", error);
    throw error;
  }
};

const getCompleteMessageList = async (phiid) => {
  try {
    console.log(phiid);
    const response = await Apiclient.get(
      API_URL + `getAllCompletedMessages/${phiid}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during getting message list:", error);
    throw error;
  }
};

export default {
  getMessageList,
  updateStatus,
  getSentMessageList,
  getMessagebyId,
  saveNote,
  getAllChatMessages,
  setReadStatus,
  saveExtendedFormData,
  getCompleteMessageList,
};
