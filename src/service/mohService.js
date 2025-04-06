import Apiclient from "./apiClient.js"; // Import the reusable Axios client

let API_URL = "/api/v1/moh/"; // Relative path for auth-related endpoints

//save Disease Notification
const saveDiseaseNotification = async (notificationData) => {
  try {
    console.log(notificationData);
    const response = await Apiclient.post(
      API_URL + "saveDiseaseNotification",
      notificationData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during disease notification save:", error);
    throw error;
  }
};

const getAssignedPhiOfficers = async (mohid) => {
  try {
    console.log(mohid);
    const response = await Apiclient.get(
      API_URL + `viewAllAssigendPhiOfficers/${mohid} `
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during getting phi officers:", error);
    throw error;
  }
};

const sendH544Form = async (message) => {
  try {
    console.log(message);
    const response = await Apiclient.post(
      API_URL + "sendDiseaseNotification",
      message
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during  sending disease notification :", error);
    throw error;
  }
};

const getMessageList = async (mohid) => {
  try {
    console.log(mohid);
    const response = await Apiclient.get(API_URL + `getAllmessages/${mohid} `);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during getting message list:", error);
    throw error;
  }
};

const updateH544Form = async (id, updates) => {
  try {
    console.log(updates);
    const response = await Apiclient.patch(
      `${API_URL}updateDiseaseNotification/${id}`,
      updates
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating disease notification:", error);
    throw error;
  }
};

const deleteMessage = async (messageId) => {
  try {
    // console.log(mohid);
    const response = await Apiclient.delete(
      API_URL + `deleteMessage/${messageId} `
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during deleting messages:", error);
    throw error;
  }
};

const getAllThePhi = async (id) => {
  try {
    const response = await Apiclient.get(API_URL + `getAllPhis/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error(" error fetching  the phis");
  }
};

const assignPhi = async (mohId, phiId) => {
  try {
    const response = await Apiclient.patch(
      API_URL + `updatePhi?mohId=${mohId}&phiId=${phiId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const unassignPhi = async (phiId) => {
  try {
    const response = await Apiclient.patch(API_URL + `unassignPhi/${phiId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//unassignPhi

export default {
  saveDiseaseNotification,
  getAssignedPhiOfficers,
  sendH544Form,
  getMessageList,
  updateH544Form,
  deleteMessage,
  getAllThePhi,
  assignPhi,
  unassignPhi,
};
