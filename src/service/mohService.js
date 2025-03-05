import Apiclient from "./apiClient.js"; // Import the reusable Axios client

let API_URL = "/api/v1/moh/"; // Relative path for auth-related endpoints

//save Disease Notification
const saveDiseaseNotification = async (notificationData) => {
  try {
    const response = await Apiclient.post(
      API_URL + "saveDiseaseNotification",
      notificationData
    );
    return response.data;
  } catch (error) {
    console.error("Error during disease notification save:", error);
    throw error;
  }
};

export default { saveDiseaseNotification };
