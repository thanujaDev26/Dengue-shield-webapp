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

const updatePatient = async (id, patientData) => {
  try {
    const response = await Apiclient.patch(
      `${API_URL}updatePatient/${id}`,
      patientData
    );
    console.log("Patient updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating patient details:", error);
    throw error;
  }
};

const registerPatient = async (patientData) => {
  try {
    console.log("Patient Data being sent:", patientData); // Log the data
    const response = await Apiclient.post(
      `${API_URL}save-patient`,
      patientData
    );
    console.log("Patient registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering patient details:", error);
    throw error.response.data.message;
  }
};


const getPatientById = async (id) => {
  try {
    const response = await Apiclient.get(API_URL + `getPatient/${id}`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
}



export default {
  updatePatient,
  fetchAllPateints,
  registerPatient,
  getPatientById,
};
