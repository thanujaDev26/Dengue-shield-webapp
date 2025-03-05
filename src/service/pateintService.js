import Apiclient from "./apiClient.js"; // Import the reusable Axios client

let API_URL = "/api/v1/patient/"; // Relative path for auth-related endpoints

const fetchAllPateints = async () => {
  try {
    const response = await Apiclient.get(API_URL + "getPatients");
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

const findPatient = async (patientData) => {
  try {
    const response = await Apiclient.post(API_URL + "findPatient", patientData);
    return response.data;
  } catch (error) {
    console.error("Error during disease notification save:", error);
    throw error;
  }
};

export default { findPatient, fetchAllPateints };
