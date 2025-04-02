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

export default {
  getMessageList,
  updateStatus,
  getSentMessageList,
  getMessagebyId,
  saveNote,
};
